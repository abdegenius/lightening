"use client";

import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

export function Toggle() {
  const { setTheme, theme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center flex-none w-10 h-10 mx-auto justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      {theme === "dark" ? (
        <FaMoon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <FaSun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
}
