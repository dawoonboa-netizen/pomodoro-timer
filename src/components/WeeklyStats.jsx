import { motion } from 'framer-motion';

export const WeeklyStats = ({ weeklyData }) => {
    // Map English keys (storage) to Korean labels (display)
    const days = [
        { key: 'Mon', label: '월' },
        { key: 'Tue', label: '화' },
        { key: 'Wed', label: '수' },
        { key: 'Thu', label: '목' },
        { key: 'Fri', label: '금' },
        { key: 'Sat', label: '토' },
        { key: 'Sun', label: '일' },
    ];

    // Find max value for scaling (min 60 mins to avoid empty chart looking weird)
    const values = Object.values(weeklyData);
    const maxMinutes = Math.max(60, ...values);

    return (
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-md rounded-3xl p-6 border border-pink-500/20 shadow-lg shadow-pink-500/10">
            <h2 className="text-xl font-bold text-pink-400 mb-6 text-center font-mono tracking-wider">
                주간 집중 기록 🎀
            </h2>

            <div className="flex justify-between items-end h-40 gap-2">
                {days.map((day, index) => {
                    const minutes = weeklyData[day.key] || 0;
                    const heightPercentage = Math.min(100, (minutes / maxMinutes) * 100);

                    return (
                        <div key={day.key} className="flex flex-col items-center gap-2 flex-1">
                            <div className="relative w-full flex items-end justify-center h-full group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                                    className="w-full bg-pink-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity relative"
                                >
                                    {/* Tooltip for exact minutes */}
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-pink-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-pink-500/30 z-20">
                                        {minutes}분
                                    </div>
                                </motion.div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{day.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
