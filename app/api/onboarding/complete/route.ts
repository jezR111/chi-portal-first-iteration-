// File: app/api/onboarding/complete/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const userId = session.user.id;
    const body = await req.json();

    const { personalInfo, stageAndGoals, outcomes } = body;

    await prisma.$transaction(async (tx) => {
      // This update for the User model remains the same
      await tx.user.update({
        where: { id: userId },
        data: {
          displayName: personalInfo.displayName,
          onboardingStatus: 'COMPLETED',
        },
      });

      // This is the new, more robust upsert command for the Profile
      await tx.profile.upsert({
        where: { userId: userId },
        // This data will be used if the profile is being UPDATED
        update: {
          currentRole: personalInfo.currentRole,
          biggestChallenge: personalInfo.biggestChallenge,
          motivationLevel: personalInfo.motivationLevel,
          developmentStage: stageAndGoals.developmentStage,
          focusAreas: outcomes.selectedOutcomes,
        },
        // This data will be used if the profile needs to be CREATED
        create: {
          userId: userId,
          currentRole: personalInfo.currentRole,
          biggestChallenge: personalInfo.biggestChallenge,
          motivationLevel: personalInfo.motivationLevel,
          developmentStage: stageAndGoals.developmentStage,
          focusAreas: outcomes.selectedOutcomes,
        },
      });
    });

    return NextResponse.json({ message: 'Onboarding completed successfully' });

  } catch (error) {
    console.error('ONBOARDING_COMPLETE_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
