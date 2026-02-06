import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useVibe } from '../context/VibeContext';
import { Check } from 'lucide-react';

const Services = () => {
    const { t } = useVibe();
    const [billing, setBilling] = useState('month'); // 'month' or 'session'

    const services = [
        {
            title: "O-Level Math",
            features: ["Algebra", "Geometry", "Past Papers", "Weekend Classes"],
            priceMonth: "12k PKR",
            priceSession: "3k PKR"
        },
        {
            title: "O-Level CS",
            features: [t("Pseudocode Mastery", "Pseudocode God Mode"), "Python Basics", "Theory Crash Course", "Weekend Classes"],
            priceMonth: "12k PKR",
            priceSession: "3k PKR",
            popular: true
        },
        {
            title: "A-Level CS",
            features: ["Advanced Coding", "P3 & P4", "Project Help", "Weekend Classes"],
            priceMonth: "15k PKR",
            priceSession: "5k PKR"
        }
    ];

    return (
        <section className="py-20 px-6 bg-dark/50" id="services">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
                        {t("Services & Pricing", "The Menu")}
                    </h2>

                    {/* Toggle */}
                    <div className="inline-flex bg-gray-900 rounded-full p-1 border border-primary/20">
                        <button
                            onClick={() => setBilling('month')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billing === 'month' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            {t("Monthly", "Sub")}
                        </button>
                        <button
                            onClick={() => setBilling('session')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billing === 'session' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            {t("Per Session", "One-off")}
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10, boxShadow: "0 20px 40px -20px rgba(6,182,212,0.3)" }}
                            className={`bg-gray-900/50 backdrop-blur border ${service.popular ? 'border-primary' : 'border-gray-800'} p-8 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-colors`}
                        >
                            {service.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    {t("Most Popular", "GOAT Choice")}
                                </div>
                            )}

                            <h3 className="text-2xl font-bold font-heading mb-2">{service.title}</h3>
                            <div className="text-3xl font-bold text-white mb-6">
                                {billing === 'month' ? service.priceMonth : service.priceSession}
                                <span className="text-sm text-gray-400 font-normal">
                                    /{billing === 'month' ? 'mo' : 'session'}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-secondary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-black transition-all"
                            >
                                {t("Select Plan", "Lock In")}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
