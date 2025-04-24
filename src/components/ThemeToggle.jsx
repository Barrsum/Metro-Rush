// src/components/ThemeToggle.jsx
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Using Feather Icons from react-icons

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon size={20} /> // Show moon icon in light mode
      ) : (
        <FiSun size={20} /> // Show sun icon in dark mode
      )}
    </button>
  );
}

export default ThemeToggle;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos