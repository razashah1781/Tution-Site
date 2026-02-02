import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useVibe } from '../context/VibeContext';
import Hero from '../components/Hero';
import VibeSelector from '../components/VibeSelector';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';

const HomePage = () => {
    const { t } = useVibe();
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{t("Raza's CS & Math Hub | O-Level Tutor", "Raza's Brainrot Hub | Academic Weaponry")}</title>
                <meta name="description" content="Top-tier O/A Level Computer Science and Mathematics tuition. Get A*s/A grades with FAST NUCES expertise." />
            </Helmet>
            <VibeSelector />
            <Hero />
            <About />
            <Services />
            <Contact />
        </div>
    );
};

export default HomePage;
