import { useState, useEffect } from 'react';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const getDayName = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()];
};

const getInitialStats = () => {
    const saved = localStorage.getItem('pomodoro-stats');
    return saved ? JSON.parse(saved) : { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
};

export const useTimer = () => {
    const [mode, setMode] = useState('focus'); // 'focus' | 'break'
    const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
    const [isActive, setIsActive] = useState(false);
    const [stats, setStats] = useState(getInitialStats());

    useEffect(() => {
        localStorage.setItem('pomodoro-stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);

            // If a focus session finished, add 25 mins to stats
            if (mode === 'focus') {
                const today = getDayName();
                setStats(prev => ({
                    ...prev,
                    [today]: (prev[today] || 0) + 25
                }));
            }

            const newMode = mode === 'focus' ? 'break' : 'focus';
            setMode(newMode);
            setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
    };

    return {
        timeLeft,
        mode,
        isActive,
        toggleTimer,
        resetTimer,
        switchMode,
        totalTime: mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        stats
    };
};
