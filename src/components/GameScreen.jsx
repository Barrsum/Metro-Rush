// src/components/GameScreen.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import PauseModal from './PauseModal';

// --- Constants ---
const LANES = [-1, 0, 1];
const LANE_WIDTH = 100;
const PLAYER_START_LANE = 0;
// Difficulty Settings
const GAME_SPEED_START = 4;
const GAME_SPEED_INCREMENT = 0.0008;
const OBSTACLE_SPAWN_RATE_START = 160;
const OBSTACLE_SPAWN_RATE_DECREASE = 0.01;
const MIN_OBSTACLE_SPAWN_RATE = 45;
// Object Dimensions
const PLAYER_WIDTH = 50; // Use these in style prop
const PLAYER_HEIGHT = 80; // Use these in style prop
const OBSTACLE_WIDTH = 50; // Use these in style prop
const OBSTACLE_HEIGHT = 80; // Use these in style prop
// Road Markings
const ROAD_MARKING_HEIGHT = 40;
const ROAD_MARKING_WIDTH = 6;
const ROAD_MARKING_SPAWN_RATE = 40;


// Accept onHowToPlay and onGoHome props from App.jsx
function GameScreen({ onGameOver, highScore, onHowToPlay, onGoHome }) {
    // --- State ---
    const [playerLane, setPlayerLane] = useState(PLAYER_START_LANE);
    const [obstacles, setObstacles] = useState([]);
    const [roadMarkings, setRoadMarkings] = useState([]);
    const [score, setScore] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(GAME_SPEED_START);
    const [obstacleSpawnRate, setObstacleSpawnRate] = useState(OBSTACLE_SPAWN_RATE_START);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Pause state

    // --- Refs ---
    const gameAreaRef = useRef(null);
    const animationFrameId = useRef(null);
    const obstacleCounter = useRef(0);
    const markingCounter = useRef(0);
    const frameCounterObstacle = useRef(0);
    const frameCounterMarking = useRef(0);
    const playerLaneRef = useRef(playerLane);
    const scoreRef = useRef(score);
    const gameSpeedRef = useRef(gameSpeed);
    const obstaclesRef = useRef(obstacles);
    const obstacleSpawnRateRef = useRef(obstacleSpawnRate);

    // --- Ref Synchronization Effects ---
    useEffect(() => { playerLaneRef.current = playerLane; }, [playerLane]);
    useEffect(() => { scoreRef.current = score; }, [score]);
    useEffect(() => { gameSpeedRef.current = gameSpeed; }, [gameSpeed]);
    useEffect(() => { obstaclesRef.current = obstacles; }, [obstacles]);
    useEffect(() => { obstacleSpawnRateRef.current = obstacleSpawnRate; }, [obstacleSpawnRate]);


    // --- Game Loop Logic (Stable Callback) ---
    const gameLoop = useCallback(() => {
        if (isGameOver) return;

        const currentGameSpeed = gameSpeedRef.current;
        const gameAreaHeight = gameAreaRef.current?.clientHeight || 600;

        frameCounterObstacle.current++;
        frameCounterMarking.current++;

        // 1. Increase Difficulty
        setGameSpeed(prev => prev + GAME_SPEED_INCREMENT);
        setObstacleSpawnRate(prev => Math.max(MIN_OBSTACLE_SPAWN_RATE, prev - OBSTACLE_SPAWN_RATE_DECREASE));

        // 2a. Move/Remove Obstacles
        setObstacles(prevObstacles =>
            prevObstacles
                .map(obs => ({ ...obs, y: obs.y + currentGameSpeed }))
                .filter(obs => obs.y < gameAreaHeight + OBSTACLE_HEIGHT)
        );

        // 2b. Move/Remove Road Markings
        setRoadMarkings(prevMarkings =>
            prevMarkings
                .map(mark => ({ ...mark, y: mark.y + currentGameSpeed }))
                .filter(mark => mark.y < gameAreaHeight + ROAD_MARKING_HEIGHT)
        );

        // 3a. Spawn New Obstacles
        if (frameCounterObstacle.current >= Math.floor(obstacleSpawnRateRef.current)) {
            frameCounterObstacle.current = 0;
            const newLaneIndex = Math.floor(Math.random() * LANES.length);
            setObstacles(prevObstacles => [
                ...prevObstacles,
                { id: obstacleCounter.current++, lane: LANES[newLaneIndex], y: -OBSTACLE_HEIGHT },
            ]);
        }

        // 3b. Spawn New Road Markings
         if (frameCounterMarking.current >= ROAD_MARKING_SPAWN_RATE) {
             frameCounterMarking.current = 0;
             setRoadMarkings(prevMarkings => [
                 ...prevMarkings,
                 { id: markingCounter.current++, xOffset: -LANE_WIDTH / 2, y: -ROAD_MARKING_HEIGHT },
                 { id: markingCounter.current++, xOffset: LANE_WIDTH / 2, y: -ROAD_MARKING_HEIGHT }
             ]);
         }

        // 4. Increment Score
        setScore(prevScore => prevScore + Math.round(currentGameSpeed / 5));

        // 5. Check Collisions
        const currentPlayerLane = playerLaneRef.current;
        const currentObstacles = obstaclesRef.current;

        const playerBottomY = gameAreaHeight - 20;
        const playerTopY = playerBottomY - PLAYER_HEIGHT;
        const playerCenterX = currentPlayerLane * LANE_WIDTH;
        const playerLeft = playerCenterX - PLAYER_WIDTH / 2;
        const playerRight = playerCenterX + PLAYER_WIDTH / 2;

        for (const obs of currentObstacles) {
            const obsCenterX = obs.lane * LANE_WIDTH;
            const obsLeft = obsCenterX - OBSTACLE_WIDTH / 2;
            const obsRight = obsCenterX + OBSTACLE_WIDTH / 2;
            const obsTop = obs.y;
            const obsBottom = obs.y + OBSTACLE_HEIGHT;

            const collisionX = playerLeft < obsRight && playerRight > obsLeft;
            const collisionY = playerTopY < obsBottom && playerBottomY > obsTop;

            if (collisionX && collisionY) {
                setIsGameOver(true);
                onGameOver(scoreRef.current);
                return;
            }
        }
    }, [isGameOver, onGameOver]);


    // --- Pause/Resume Handler ---
    const togglePause = useCallback(() => {
        if (isGameOver) return;
        setIsPaused(prev => !prev);
    }, [isGameOver]);


    // --- Input Handlers ---
    const handleKeyDown = useCallback((e) => {
        if (isGameOver || isPaused) return;
        switch (e.key) {
            case 'a': case 'ArrowLeft':
                setPlayerLane(prev => Math.max(LANES[0], prev - 1));
                break;
            case 'd': case 'ArrowRight':
                setPlayerLane(prev => Math.min(LANES[LANES.length - 1], prev + 1));
                break;
            case 'p': case 'P':
                togglePause();
                break;
            default: break;
        }
    }, [isGameOver, isPaused, togglePause]);

    const touchStartX = useRef(0);
    const handleTouchStart = useCallback((e) => {
        if (isGameOver || isPaused) return;
        touchStartX.current = e.touches[0].clientX;
    }, [isGameOver, isPaused]);

    const handleTouchEnd = useCallback((e) => {
        if (isGameOver || isPaused || touchStartX.current === 0) return;
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;
        touchStartX.current = 0;
        const swipeThreshold = 30;
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                setPlayerLane(prev => Math.min(LANES[LANES.length - 1], prev + 1));
            } else {
                setPlayerLane(prev => Math.max(LANES[0], prev - 1));
            }
        }
    }, [isGameOver, isPaused]);


    // --- Effects ---
    // Effect for attaching/detaching input event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const gameAreaElement = gameAreaRef.current;
        if (gameAreaElement) {
            gameAreaElement.addEventListener('touchstart', handleTouchStart, { passive: true });
            gameAreaElement.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (gameAreaElement) {
                gameAreaElement.removeEventListener('touchstart', handleTouchStart);
                gameAreaElement.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [handleKeyDown, handleTouchStart, handleTouchEnd]);


    // Effect for controlling the game loop (starting/stopping based on state)
    useEffect(() => {
        let isActive = true;
        const runFrame = () => {
            if (!isActive) return;
            gameLoop();
            if (!isGameOver && !isPaused) {
                 animationFrameId.current = requestAnimationFrame(runFrame);
            }
        }
        if (!isGameOver && !isPaused) {
            animationFrameId.current = requestAnimationFrame(runFrame);
        }
        return () => {
            isActive = false;
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameLoop, isGameOver, isPaused]);


    // Effect for resetting game state when starting a new game (after game over)
    useEffect(() => {
        if (!isGameOver) {
            frameCounterObstacle.current = 0;
            frameCounterMarking.current = 0;
            obstacleCounter.current = 0;
            markingCounter.current = 0;
            setObstacles([]);
            setRoadMarkings([]);
            setGameSpeed(GAME_SPEED_START);
            setObstacleSpawnRate(OBSTACLE_SPAWN_RATE_START);
            setIsPaused(false);
            setPlayerLane(PLAYER_START_LANE);
            playerLaneRef.current = PLAYER_START_LANE;
            gameSpeedRef.current = GAME_SPEED_START;
            obstacleSpawnRateRef.current = OBSTACLE_SPAWN_RATE_START;
        }
    }, [isGameOver]);


    // --- Rendering ---
    const playerXOffset = playerLane * LANE_WIDTH;

    return (
        <> {/* Fragment allows PauseModal sibling to game area */}
            <div
                className="w-full h-[600px] max-w-[400px] bg-gray-700 dark:bg-gray-800 overflow-hidden relative border-4 border-gray-900 dark:border-black rounded-lg shadow-xl"
                ref={gameAreaRef}
                style={{ perspective: '400px' }}
            >
                {/* Road Surface & Markings Container */}
                 <div className="absolute inset-0" style={{ transform: 'translateZ(-100px)' }}>
                    {roadMarkings.map(mark => (
                        <div
                            key={mark.id}
                            className="absolute bg-white bg-opacity-60"
                            style={{
                                left: `calc(50% + ${mark.xOffset}px)`,
                                top: `${mark.y}px`,
                                width: `${ROAD_MARKING_WIDTH}px`,
                                height: `${ROAD_MARKING_HEIGHT}px`,
                                transform: 'translateX(-50%)',
                            }}
                        />
                    ))}
                </div>

                {/* UI Overlay Elements */}
                 <div className="absolute top-2 left-2 right-2 z-20 flex justify-center items-center pointer-events-none"> {/* Centered container */}
                     {/* Score Display (Left Aligned) */}
                     <div className="absolute left-0 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md font-mono text-base shadow pointer-events-auto">
                         Score: {score}
                     </div>

                     {/* Pause/Resume Button (Center) */}
                     {!isGameOver && (
                         <button
                             onClick={togglePause}
                             className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 pointer-events-auto mx-auto" // Added mx-auto for centering within flex
                             aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
                             title={isPaused ? 'Resume (P)' : 'Pause (P)'}
                         >
                             {isPaused ? <FaPlay size={16} /> : <FaPause size={16} />}
                         </button>
                     )}

                     {/* High Score Display (Right Aligned) */}
                     {/* --- CORRECTION: Font size was text-base, changed to text-xs like before --- */}
                     <div className="absolute right-0 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md font-mono text-base shadow pointer-events-auto">
                         High Score: {highScore}
                     </div>
                </div>

                {/* Game Elements */}
                {/* Player Car */}
                <div
                    // REMOVED w-[...] and h-[...] from className
                    className={`absolute bottom-5 bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 border-2 border-black rounded-t-md shadow-lg z-10 ${isPaused ? 'opacity-50 blur-sm' : ''}`}
                    style={{
                        // ADDED width and height to style prop
                        width: PLAYER_WIDTH,
                        height: PLAYER_HEIGHT,
                        left: `calc(50% + ${playerXOffset}px)`,
                        transform: `translateX(-50%) translateZ(10px)`,
                        transition: isPaused ? 'none' : 'left 0.1s linear',
                    }}
                ></div>

                {/* Obstacles */}
                {obstacles.map(obs => (
                    <div
                        key={obs.id}
                        // REMOVED w-[...] and h-[...] from className
                        className={`absolute bg-gradient-to-b from-red-400 to-red-600 dark:from-red-500 dark:to-red-700 border-2 border-black rounded-t-md shadow-md z-10 ${isPaused ? 'opacity-50 blur-sm' : ''}`}
                        style={{
                            // ADDED width and height to style prop
                            width: OBSTACLE_WIDTH,
                            height: OBSTACLE_HEIGHT,
                            left: `calc(50% + ${obs.lane * LANE_WIDTH}px)`,
                            top: `${obs.y}px`,
                            transform: 'translateX(-50%) translateZ(5px)',
                        }}
                    ></div>
                ))}
            </div> {/* End Game Area Div */}

            {/* Render Pause Modal Conditionally outside the main game div */}
            <PauseModal
                isOpen={isPaused}
                onResume={togglePause} // Pass togglePause as onResume
                onHowToPlay={onHowToPlay} // Pass down from App
                onGoHome={onGoHome} // Pass down from App
            />
        </> // End Fragment
    );
}

export default GameScreen;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos