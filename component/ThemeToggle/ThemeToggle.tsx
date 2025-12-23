"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⬅️ CRITICAL

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const handleToggleVisual = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  console.log("theme: ", theme);

  return (
    <div onClick={handleToggleVisual} className="hover:cursor-pointer">
      {theme === "light" ? (
        <Sun className="h-8 w-8" />
      ) : (
        <Moon className="h-8 w-8" />
      )}
    </div>
  );
};

export default ThemeToggle;
