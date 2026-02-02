import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVibe } from '../context/VibeContext';

const Hero = () => {
    const { t } = useVibe();
    const [textIndex, setTextIndex] = useState(0);
    const professionalPhrases = ["Master O-Level CS", "Get A*s in Python", "Ace Your Math Exam"];
    const brainrotPhrases = ["Become an Academic Weapon", "Mog the Examiner", "Cook the Paper"];

    // Check if phrases changed to reset/adjust textIndex if needed, but simple re-render works
    const phrases = t(professionalPhrases, brainrotPhrases);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [phrases]); // Dependency on phrases ensures we switch content correctly

    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 px-6 gap-10 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center md:text-left z-10 max-w-2xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl md:text-2xl text-primary font-body tracking-widest uppercase"
                >
                    {t("Syed Muhammad Raza Hussain", "The Final Boss of Tutors")}
                </motion.h2>

                <div className="h-[160px] md:h-[220px] flex items-center justify-center md:justify-start">
                    <AnimatePresence mode='wait'>
                        <motion.h1
                            key={textIndex + (t("pro", "rot"))} // Force re-render on vibe switch
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl md:text-7xl font-heading font-bold leading-tight"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                {phrases[textIndex]}
                            </span>
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-6"
                >
                    <button
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-primary text-black font-bold font-heading rounded hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)] transform hover:scale-105 active:scale-95"
                    >
                        {t("Book a Demo", "Let me Cook")}
                    </button>
                    <button
                        onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 border border-secondary text-secondary font-bold font-heading rounded hover:bg-secondary/10 transition-all transform hover:scale-105 active:scale-95"
                    >
                        {t("View Courses", "Fix My GPA")}
                    </button>
                </motion.div>
            </div>

            {/* Right Content - Parallax/3D Image Placeholder */}
            <motion.div
                className="flex-1 relative flex justify-center items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <motion.div
                        className="w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 flex items-center justify-center relative overflow-hidden group shadow-2xl"
                        whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                        style={{ perspective: 1000 }}
                    >
                        <div className="text-center p-6">
                            <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
                            <span className="text-gray-500 font-body text-lg block">
                                [Tutor Image]
                            </span>
                            <span className="text-xs text-gray-600 font-mono mt-2 block">
                                Use Generate Image Tool
                            </span>
                        </div>
                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50 pointer-events-none"></div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
