import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVibe } from '../../context/VibeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { isBrainrot, toggleVibe, t } = useVibe();

    return (
        <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-dark/80 backdrop-blur-md border-b border-primary/20">
            <div className="text-2xl font-heading font-bold text-primary">
                {t("Raza's Hub", "Raza's Base")}
            </div>

            <div className="flex items-center gap-6">
                <ul className="hidden md:flex gap-6 font-body text-sm">
                    <Link to="/" className="hover:text-primary cursor-pointer transition-colors">Home</Link>
                    <li className="hover:text-primary cursor-pointer transition-colors">{t("About", "Lore")}</li>
                    <li className="hover:text-primary cursor-pointer transition-colors">{t("Services", "Quests")}</li>
                    <Link to="/resources" className="hover:text-primary cursor-pointer transition-colors">{t("Resources", "Loot")}</Link>
                    <li className="hover:text-primary cursor-pointer transition-colors">{t("Contact", "Slide DMs")}</li>
                </ul>

                <button
                    onClick={toggleVibe}
                    className="flex items-center gap-2 border border-primary/50 rounded-full px-4 py-1 hover:bg-primary/10 transition-all font-body text-xs"
                >
                    <span>{isBrainrot ? "💀 Brainrot" : "👔 Pro"}</span>
                    <motion.div
                        layout
                        className={`w-4 h-4 rounded-full ${isBrainrot ? 'bg-red-500' : 'bg-primary'}`}
                    />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
