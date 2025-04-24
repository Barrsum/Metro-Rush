// src/components/StartScreen.jsx
import React, { useState } from 'react';
import HowToPlayModal from './HowToPlayModal';
import { FaPlay, FaQuestion } from 'react-icons/fa'; // Example icons

function StartScreen({ onStartGame }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
        {/* Optional: Add an engaging icon */}
        <div className="mb-4 text-5xl text-blue-500 dark:text-blue-400">🚇</div>

        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-800 dark:text-gray-100">
          Metro Rush
        </h2>
        <p className="text-base sm:text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-xs">
          Created By Ram Bapat
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center">
          {/* Start Button */}
          <button
            onClick={onStartGame}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
          >
            <FaPlay /> Start Rushing!
          </button>
          {/* How to Play Button */}
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
              <FaQuestion /> How to Play?
          </button>
        </div>

        {/* Simplified Controls Reminder */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Controls: <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">A</kbd>/<kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">D</kbd>, <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">←</kbd>/<kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">→</kbd>, Swipe
        </div>
      </div>

      <HowToPlayModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default StartScreen;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos