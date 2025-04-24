// src/components/PauseModal.jsx
import React from 'react';
import { FaPlay, FaQuestion, FaHome } from 'react-icons/fa';

function PauseModal({ onResume, onHowToPlay, onGoHome, isOpen }) {
  if (!isOpen) return null; // Don't render if not open

  return (
    // Backdrop - covers the screen, high z-index
    <div
      className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      // onClick={onResume} // Optional: Resume on backdrop click
    >
      {/* Modal Content Box */}
      <div
        className={`bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-xl shadow-2xl p-6 sm:p-8 max-w-xs w-full relative text-gray-800 dark:text-gray-100 transform transition-all duration-200 ease-out border border-gray-200 dark:border-gray-700 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks bubbling to backdrop
      >
        {/* Title */}
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Paused
        </h3>

        {/* Button Container */}
        <div className="flex flex-col gap-4 w-full">
          {/* Resume Button */}
          <button
            onClick={onResume}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
          >
            <FaPlay /> Resume
          </button>

          {/* How to Play Button */}
          <button
            onClick={onHowToPlay}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <FaQuestion /> How to Play
          </button>

          {/* Back to Home Button */}
          <button
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-500 hover:bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
          >
            <FaHome /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PauseModal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos