// app/api/habits/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { startOfDay, endOfDay, subDays } from "date-fns";

const prisma = new PrismaClient();

const createHabitSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  category: z.string(),
  frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY"]),
  targetCount: z.number().min(1).default(1),
  color: z.string().default("#3B82F6"),
  icon: z.string().optional(),
});

// GET /api/habits - Get all habits for the user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get date range for entries (last 30 days)
    const endDate = endOfDay(new Date());
    const startDate = startOfDay(subDays(endDate, 30));

    const habits = await prisma.habit.findMany({
      where: {
        userId: session.user.id,
        active: true,
      },
      include: {
        entries: {
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          orderBy: {
            date: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate streaks and completion rates
    const habitsWithStats = habits.map((habit) => {
      const sortedEntries = habit.entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Calculate current streak
      let currentStreak = 0;
      const today = startOfDay(new Date());
      let checkDate = today;

      for (let i = 0; i < 30; i++) {
        const entry = sortedEntries.find(
          (e) => startOfDay(new Date(e.date)).getTime() === checkDate.getTime()
        );
        
        if (entry?.completed) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        } else if (i === 0) {
          // If today is not completed, check yesterday
          checkDate = subDays(checkDate, 1);
        } else {
          break;
        }
      }

      // Calculate best streak
      let bestStreak = 0;
      let tempStreak = 0;
      
      for (const entry of sortedEntries) {
        if (entry.completed) {
          tempStreak++;
          bestStreak = Math.max(bestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      // Calculate completion rate
      const totalDays = Math.min(
        30,
        Math.ceil(
          (today.getTime() - new Date(habit.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
      const completedDays = sortedEntries.filter((e) => e.completed).length;
      const completionRate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

      return {
        ...habit,
        currentStreak,
        bestStreak,
        completionRate: Math.round(completionRate),
      };
    });

    return NextResponse.json(habitsWithStats);
  } catch (error) {
    console.error("Error fetching habits:", error);
    return NextResponse.json(
      { error: "Failed to fetch habits" },
      { status: 500 }
    );
  }
}

// POST /api/habits - Create a new habit
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createHabitSchema.parse(body);

    const habit = await prisma.habit.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        active: true,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "New Habit Created!",
        message: `You've added "${habit.title}" to your habits. Stay consistent!`,
        type: "SUCCESS",
      },
    });

    // Check for habit-related achievements
    const habitCount = await prisma.habit.count({
      where: {
        userId: session.user.id,
        active: true,
      },
    });

    // Award achievement for first habit
    if (habitCount === 1) {
      const achievement = await prisma.achievement.findFirst({
        where: { name: "Habit Builder" },
      });

      if (!achievement) {
        const newAchievement = await prisma.achievement.create({
          data: {
            name: "Habit Builder",
            description: "Created your first habit",
            icon: "🎯",
            points: 25,
            category: "Habits",
            requirement: { type: "first_habit" },
          },
        });

        await prisma.userAchievement.create({
          data: {
            userId: session.user.id,
            achievementId: newAchievement.id,
          },
        });
      } else {
        const existingUserAchievement = await prisma.userAchievement.findUnique({
          where: {
            userId_achievementId: {
              userId: session.user.id,
              achievementId: achievement.id,
            },
          },
        });

        if (!existingUserAchievement) {
          await prisma.userAchievement.create({
            data: {
              userId: session.user.id,
              achievementId: achievement.id,
            },
          });
        }
      }
    }

    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Error creating habit:", error);
    return NextResponse.json(
      { error: "Failed to create habit" },
      { status: 500 }
    );
  }
}