// src/components/HowToPlayModal.jsx
import React from 'react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FiSmartphone } from 'react-icons/fi'; // Swipe Icon

function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Backdrop - slightly darker
    <div
      className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Smooth fade-in/out
      onClick={onClose}
    >
      {/* Modal Content Box */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 pt-10 sm:p-8 sm:pt-12 max-w-md w-full relative text-gray-800 dark:text-gray-100 transform transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} // Scale/fade effect
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Improved styling */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          aria-label="Close How to Play modal"
          title="Close"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Title */}
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          How to Play
        </h3>

        {/* Instructions - Improved layout */}
        <div className="space-y-5 text-sm sm:text-base">
          <p className="text-center text-gray-600 dark:text-gray-400">Your goal is simple: drive as far as possible, avoiding the <span className="text-red-500 font-medium">red cars</span>!</p>

          <div className="space-y-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className='font-medium text-gray-700 dark:text-gray-200'>Desktop Controls:</p>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                <div className="flex items-center gap-2">
                    <span className="font-semibold w-16">Move Left:</span>
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-xs">A</kbd> or <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-xs"><FaArrowLeft /></kbd>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold w-16">Move Right:</span>
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-xs">D</kbd> or <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-xs"><FaArrowRight /></kbd>
                </div>
              </div>
          </div>

          <div className="space-y-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className='font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2'><FiSmartphone /> Mobile Controls:</p>
              <div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                <span className="font-semibold">Swipe Left</span> or <span className="font-semibold">Swipe Right</span> on the screen.
              </div>
          </div>

          <p className="text-center pt-2 text-gray-600 dark:text-gray-400">The game speeds up over time. Good luck!</p>
        </div>
      </div>
    </div>
  );
}

export default HowToPlayModal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos