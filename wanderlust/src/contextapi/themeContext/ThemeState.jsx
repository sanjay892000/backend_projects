import React, { useState } from 'react'
import themeContext from './themeContext';

function ThemeState({ children }) {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const lightMode = () => {
        setTheme('light')
        localStorage.setItem('theme', 'light')
    }
    const darkMode = () => {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
    }

    return (
        <themeContext.Provider value={{ theme, darkMode, lightMode }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeState
