// src/components/ThemeToggleButton.tsx
"use client";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      size="sm"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <Moon /> : <Sun />}
    />
  );
}
