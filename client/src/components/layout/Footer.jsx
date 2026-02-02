import React from 'react';
import { useVibe } from '../../context/VibeContext';

const Footer = () => {
    const { t } = useVibe();

    return (
        <footer className="w-full py-8 text-center border-t border-primary/20 mt-20">
            <p className="text-gray-400 font-body text-sm">
                &copy; {new Date().getFullYear()} {t("Syed Muhammad Raza Hussain", "The Goated Tutor")}.
                {t(" All Rights Reserved.", " No Cap.")}
            </p>
        </footer>
    );
};

export default Footer;
