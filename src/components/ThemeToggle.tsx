import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";

interface ThemeToggleProps {
  initialTheme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

const ThemeToggle = ({
  initialTheme = "light",
  onThemeChange,
}: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  // Effect to apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2 bg-background p-2 rounded-md">
      <Sun
        className={`h-4 w-4 ${theme === "light" ? "text-amber-500" : "text-muted-foreground"}`}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon
        className={`h-4 w-4 ${theme === "dark" ? "text-indigo-400" : "text-muted-foreground"}`}
      />
    </div>
  );
};

export default ThemeToggle;
