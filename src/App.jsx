import { useTimer } from './hooks/useTimer';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { WeeklyStats } from './components/WeeklyStats';
import { motion } from 'framer-motion';

function App() {
  const { timeLeft, mode, isActive, toggleTimer, resetTimer, switchMode, totalTime, stats } = useTimer();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden transition-colors duration-1000">
      {/* Background decorations - Hotter Pinks */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${mode === 'focus' ? 'bg-pink-600/30' : 'bg-cyan-600/20'}`}
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full blur-3xl transition-colors duration-1000 ${mode === 'focus' ? 'bg-purple-600/30' : 'bg-blue-600/20'}`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 flex flex-col items-center gap-8 p-8 md:p-12 bg-gray-800/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl relative max-w-2xl w-full"
      >
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white/90 font-mono uppercase drop-shadow-lg">
            T1 Oner <span className={`transition-colors duration-300 ${mode === 'focus' ? 'text-pink-500' : 'text-cyan-400'}`}>.</span> Timer
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full">
          <div className="flex flex-col items-center gap-8">
            <TimerDisplay timeLeft={timeLeft} mode={mode} totalTime={totalTime} />
            <Controls
              isActive={isActive}
              toggleTimer={toggleTimer}
              resetTimer={resetTimer}
              mode={mode}
              switchMode={switchMode}
            />
          </div>

          {/* Divider for mobile/desktop */}
          <div className="w-full h-px bg-white/10 md:w-px md:h-80"></div>

          <div className="w-full md:w-64">
            <WeeklyStats weeklyData={stats} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
