// File: app/api/onboarding/complete/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust path if needed
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const userId = session.user.id;
    const data = await req.json();

    // Use a transaction to update multiple tables safely
    await prisma.$transaction(async (tx) => {
      // Update the User model
      await tx.user.update({
        where: { id: userId },
        data: {
          onboardingStatus: 'COMPLETED',
          bio: data.personalInfo.bio,
          phone: data.personalInfo.phone,
          timezone: data.personalInfo.timezone,
        },
      });

      // Update the Profile model
      await tx.profile.update({
        where: { userId: userId },
        data: {
          dailyGoalMinutes: data.goals.timeCommitment,
          interests: data.goals.areas,
        },
      });

      // You can add logic here to create new Habit and Goal records
      // based on `data.habits` and `data.goals.mainGoal`
    });

    return NextResponse.json({ message: 'Onboarding completed successfully' });

  } catch (error) {
    console.error('ONBOARDING_COMPLETE_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}