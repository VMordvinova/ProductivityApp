import React, { useState, useEffect, useRef } from 'react';

const WORK_DURATION = 25*60; 
const BREAK_DURATION = 5*60; 
const LONG_BREAK_DURATION = 15*60;

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const intervalRef = useRef(null);
    const [currentSession, setCurrentSession] = useState('Work Session');


    useEffect(() => {
    if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        }, 1000);
    } else if (isRunning && timeLeft === 0) {
        switchMode();
    }

    return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const switchMode = () => {
        const nextIsWork = !isWorkSession;
        setIsWorkSession(nextIsWork);
        if(nextIsWork){
            setTimeLeft(WORK_DURATION);
            setSessionsCompleted((prev) => prev + 1);
            setCurrentSession('Work Session');
        } else if (!nextIsWork && sessionsCompleted < 3){
            setTimeLeft(BREAK_DURATION);
            setCurrentSession('Short Break');
        } else if (!nextIsWork && sessionsCompleted == 3){
            setTimeLeft(LONG_BREAK_DURATION);
            setSessionsCompleted(0);
            setCurrentSession('Long Break');
        }
    };

    const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
    };

    const pauseTimer = () => setIsRunning(false);

    const resetTimer = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(WORK_DURATION);
    setSessionsCompleted(0);
    };

    const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
    };

    return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Pomodoro Timer</h1>
        <h2>{currentSession}</h2>
        <h2>{formatTime(timeLeft)}</h2>
        <div>
        {!isRunning ? (
            <button onClick={startTimer}>Start</button>
        ) : (
            <button onClick={pauseTimer}>Pause</button>
        )}
        <button onClick={resetTimer}>Reset</button>
        </div>
    </div>
    );
    };

export default Timer;
