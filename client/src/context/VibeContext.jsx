import { createContext, useContext, useState } from 'react';

const VibeContext = createContext();

export const useVibe = () => useContext(VibeContext);

export const VibeProvider = ({ children }) => {
    const [isBrainrot, setIsBrainrot] = useState(false);

    const toggleVibe = () => setIsBrainrot(prev => !prev);

    // Helper to switch text based on vibe
    const t = (standard, brainrot) => (isBrainrot ? brainrot : standard);

    return (
        <VibeContext.Provider value={{ isBrainrot, setVibe: setIsBrainrot, toggleVibe, t }}>
            {children}
        </VibeContext.Provider>
    );
};
