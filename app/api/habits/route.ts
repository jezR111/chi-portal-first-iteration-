import { NextResponse } from 'next/server';

export async function GET() {
  // Return all habits for the authenticated user
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  // Create a new habit for the authenticated user
  return NextResponse.json({});
}
