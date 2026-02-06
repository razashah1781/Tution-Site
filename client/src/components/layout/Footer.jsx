import React from 'react';
import { Instagram } from 'lucide-react';
import { useVibe } from '../../context/VibeContext';

const Footer = () => {
    const { t } = useVibe();

    return (
        <footer className="w-full py-8 text-center border-t border-primary/20 mt-20 flex flex-col items-center gap-4">
            <div className="flex justify-center gap-6">
                <a
                    href="https://instagram.com/razashub"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                    <Instagram className="w-6 h-6" />
                </a>
            </div>
            <p className="text-gray-400 font-body text-sm">
                &copy; {new Date().getFullYear()} {t("Syed Muhammad Raza Hussain", "The Goated Tutor")}.
                {t(" All Rights Reserved.", " No Cap.")}
            </p>
        </footer>
    );
};

export default Footer;
