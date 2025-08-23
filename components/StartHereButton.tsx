// File: components/StartHereButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

export const StartHereButton = () => {
    const router = useRouter();
    return (
        <Button size="lg" onClick={() => router.push('/onboarding')}>
            Start Here: Begin Your Personalized Journey
        </Button>
    );
}