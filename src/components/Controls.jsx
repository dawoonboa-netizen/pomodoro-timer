import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, label }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`p-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-colors ${className}`}
        title={label}
    >
        {children}
    </motion.button>
);

export const Controls = ({ isActive, toggleTimer, resetTimer, mode, switchMode }) => {
    return (
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
            {/* Main Controls */}
            <div className="flex gap-4">
                <Button
                    onClick={toggleTimer}
                    className={`${isActive ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                    label={isActive ? "일시정지" : "시작"}
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                </Button>

                <Button
                    onClick={resetTimer}
                    className="bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                    label="리셋"
                >
                    <RotateCcw size={32} />
                </Button>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2 bg-gray-800/50 p-2 rounded-2xl backdrop-blur-sm">
                <motion.button
                    onClick={() => switchMode('focus')}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 font-bold transition-colors ${mode === 'focus' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/50' : 'text-gray-400 hover:text-pink-400'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Brain size={20} /> 집중하기
                </motion.button>
                <motion.button
                    onClick={() => switchMode('break')}
                    className={`px-6 py-2 rounded-xl flex items-center gap-2 font-bold transition-colors ${mode === 'break' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'text-gray-400 hover:text-cyan-300'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Coffee size={20} /> 쉬어가기
                </motion.button>
            </div>
        </div>
    );
};
