import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibe } from '../context/VibeContext';

const VibeSelector = () => {
    const { setVibe } = useVibe();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasChosen = localStorage.getItem('vibe_chosen');
        if (!hasChosen) {
            // Small delay for dramatic effect
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleChoice = (isBrainrot) => {
        setVibe(isBrainrot);
        localStorage.setItem('vibe_chosen', 'true');
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-gray-900 border border-primary/30 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden"
                    >
                        {/* Radioactive Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>

                        <h2 className="text-3xl font-heading font-bold text-center mb-6 text-white relative z-10">
                            Choose Your <span className="text-primary">Reality</span>
                        </h2>

                        <p className="text-gray-400 text-center mb-10 text-sm relative z-10">
                            Warning: One path leads to professional academic guidance. The other... well.
                        </p>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <button
                                onClick={() => handleChoice(false)}
                                className="group p-4 rounded-xl border border-gray-700 hover:border-primary/50 hover:bg-gray-800 transition-all text-center space-y-3"
                            >
                                <div className="text-4xl">👔</div>
                                <div className="font-bold text-white group-hover:text-primary transition-colors">Professional</div>
                                <div className="text-xs text-gray-500">I want to study serious math.</div>
                            </button>

                            <button
                                onClick={() => handleChoice(true)}
                                className="group p-4 rounded-xl border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all text-center space-y-3"
                            >
                                <div className="text-4xl animate-pulse">💀</div>
                                <div className="font-bold text-white group-hover:text-red-500 transition-colors">Brainrot</div>
                                <div className="text-xs text-gray-500">Skibidi dop dop yes yes through O-Levels.</div>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VibeSelector;
