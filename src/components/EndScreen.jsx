// src/components/EndScreen.jsx
import React from 'react';
import { FaRedo, FaHome, FaTrophy, FaChartLine } from 'react-icons/fa'; // Example icons

function EndScreen({ score, highScore, onPlayAgain, onGoHome }) {
  return (
    // Updated Styling (Removed animate-float)
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-red-600 dark:text-red-400">
        Game Over!
      </h2>

      {/* Score Display */}
      <div className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300 space-y-3 w-full max-w-xs">
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaChartLine /> Your Score:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">{score}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaTrophy /> High Score:</span>
              <span className="font-bold text-green-600 dark:text-green-400 text-xl">{highScore}</span>
          </div>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
        >
          <FaRedo /> Play Again
        </button>
        {/* Back to Home Button */}
        <button
          onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
        >
          <FaHome /> Back to Home
        </button>
      </div>
    </div>
  );
}

export default EndScreen;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos