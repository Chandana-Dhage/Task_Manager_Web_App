import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    useEffect(() => {
        document.body.className = darkMode ? "dark-theme" : "light-theme";
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}