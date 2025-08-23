// File: app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("A valid email is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = signUpSchema.parse(body);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }
    
    // Use a transaction to create the User and Profile together
    const user = await prisma.$transaction(async (tx) => {
      // First, create the user
      const newUser = await tx.user.create({
        data: {
          email: validatedData.email,
          displayName: validatedData.name, // Use displayName to match your schema
          onboardingStatus: "NOT_STARTED",
        },
      });

      // Immediately create the associated profile
      await tx.profile.create({
        data: {
          userId: newUser.id,
          // You can add any other default profile values here
        },
      });
      
      return newUser;
    });
    
    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Failed to create account." }, { status: 500 });
  }
}
