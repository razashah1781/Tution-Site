import React from 'react';
import { motion } from 'framer-motion';
import { useVibe } from '../context/VibeContext';

const About = () => {
    const { t } = useVibe();

    const timeline = [
        { year: "2021-2022", title: "O Levels", desc: t("Scored straight A*s", "Academic Victim to Warrior") },
        { year: "2023-2024", title: "A Levels", desc: t("Pre-Engineering & CS", "Survived the Trauma") },
        { year: "2024-Present", title: "Bachelors", desc: t("BS CS at FAST NUCES", "Entering the Matrix") }
    ];

    const skills = [
        { name: "Python", level: 90, color: "bg-blue-500" },
        { name: t("Pseudocode", "Yapping"), level: 95, color: "bg-green-500" },
        { name: t("Uno Strategy", "Mind Games"), level: 100, color: "bg-red-500" },
        { name: "Debugging", level: 85, color: "bg-purple-500" },
    ];

    return (
        <section className="py-20 px-6 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 text-primary"
            >
                {t("About Me", "My Lore")}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Timeline */}
                <div className="space-y-8 relative pl-8 border-l-2 border-primary/30 ml-4 md:ml-0">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary shadow-[0_0_10px_#06b6d4]"></span>
                            <h3 className="text-xl font-bold font-heading">{item.year}</h3>
                            <div className="text-lg text-secondary font-bold">{item.title}</div>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Skills */}
                <div className="space-y-6">
                    {skills.map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2 font-body text-sm font-bold">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    className={`h-full ${skill.color}`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                ></motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
