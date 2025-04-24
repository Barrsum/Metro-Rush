// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';


function Footer() {
  const githubRepoUrl = "https://github.com/Barrsum/Metro-Rush.git";

  return (
    <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-gray-800 dark:via-black dark:to-gray-800 text-white dark:text-gray-200 p-4 text-center mt-auto shadow-inner"> {/* mt-auto pushes footer down */}
      <div className="flex justify-center space-x-6 mb-2">
        <a
          href="https://www.linkedin.com/in/ram-bapat-barrsum-diamos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          title="LinkedIn Profile"
          className="text-white dark:text-gray-300 hover:text-blue-300 dark:hover:text-blue-400 transition-colors duration-200"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository for Metro Rush"
          title="GitHub Repository for Metro Rush"
          className="text-white dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-500 transition-colors duration-200"
        >
          <FaGithub size={24} />
        </a>
      </div>
      <p className="text-sm mb-1">
        Connect via LinkedIn / View Source on GitHub
      </p>
      <p className="text-lg font-semibold mb-1">Metro Rush</p>
      <p className="text-xs">
        Created By Ram Bapat
      </p>
    </footer>
  );
}

export default React.memo(Footer);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos