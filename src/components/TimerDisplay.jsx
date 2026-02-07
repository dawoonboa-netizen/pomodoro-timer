import { motion } from 'framer-motion';

export const TimerDisplay = ({ timeLeft, mode, totalTime }) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = (timeLeft / totalTime) * 100;

    // Hot Pink theme for Focus
    const color = mode === 'focus' ? 'text-pink-500' : 'text-cyan-400';
    const ringColor = mode === 'focus' ? 'stroke-pink-600' : 'stroke-cyan-500';

    return (
        <div className="relative flex items-center justify-center w-72 h-72 md:w-80 md:h-80">
            {/* Background Ring */}
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-800"
                />
                {/* Progress Ring */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 140}
                    strokeDashoffset={2 * Math.PI * 140 * (1 - progress / 100)}
                    className={`${ringColor} transition-all duration-1000 ease-linear cap-round`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 140 * (1 - progress / 100) }}
                />
            </svg>

            {/* Time Text */}
            <div className={`text-6xl md:text-7xl font-bold font-mono tracking-wider ${color} flex flex-col items-center gap-2 drop-shadow-lg`}>
                <motion.span
                    key={timeLeft}
                    initial={{ opacity: 0.5, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </motion.span>
                <span className="text-2xl md:text-3xl font-bold font-sans opacity-90 tracking-wide text-white">
                    {mode === 'focus' ? '🔥 집중 모드' : '☕ 꿀맛 휴식'}
                </span>
            </div>
        </div>
    );
};
