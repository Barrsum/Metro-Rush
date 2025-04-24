// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-gray-800 dark:via-black dark:to-gray-800 text-white dark:text-gray-200 p-4 shadow-lg justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight animate-float">
        Metro Rush 🚇💨 {/* Added Emojis */}
      </h1>
      <p className="text-xl md:text-xl font-light">
        Created by - Ram Bapat
      </p>
    </header>
  );
}

export default React.memo(Header); 

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos