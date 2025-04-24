// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import ThemeToggle from './components/ThemeToggle';
import HowToPlayModal from './components/HowToPlayModal'; // Import here

function App() {
  // Theme state ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Game state ('start', 'game', 'end')
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('metroRushHighScore') || '0', 10);
  });

  // State for HowToPlay modal visibility (now global)
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Apply theme class to HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle game over logic
  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('metroRushHighScore', finalScore.toString());
    }
    setGameState('end');
  };

  // Start a new game
  const startGame = () => {
    setShowHowToPlay(false); // Close modal if open
    setScore(0);
    setGameState('game');
  };

  // Go back to the start screen
  const goHome = () => {
    setShowHowToPlay(false); // Close modal if open
    setGameState('start');
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Functions to control HowToPlay modal
  const openHowToPlay = () => setShowHowToPlay(true);
  const closeHowToPlay = () => setShowHowToPlay(false);

  return (
    <div className={`flex flex-col min-h-screen font-sans ${theme}`}>
      <Header />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Conditional Rendering of Screens */}
        {gameState === 'start' && (
          <StartScreen
            onStartGame={startGame}
            onHowToPlay={openHowToPlay} // Pass open function
          />
        )}
        {gameState === 'game' && (
          <GameScreen
            onGameOver={handleGameOver}
            highScore={highScore}
            onHowToPlay={openHowToPlay} // Pass open function for Pause Modal
            onGoHome={goHome} // Pass goHome function for Pause Modal
          />
        )}
        {gameState === 'end' && (
          <EndScreen
            score={score}
            highScore={highScore}
            onPlayAgain={startGame}
            onGoHome={goHome}
          />
        )}
      </main>

      <Footer />

      {/* Render HowToPlayModal globally, controlled by App state */}
      <HowToPlayModal isOpen={showHowToPlay} onClose={closeHowToPlay} />
    </div>
  );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos