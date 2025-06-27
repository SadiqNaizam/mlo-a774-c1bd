import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Define the shape of our theme
export interface ThemeState {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  destructive: string;
  card: string;
  border: string;
  radius: number; // in rem
}

// Define the context type
interface ThemeContextType {
  theme: ThemeState;
  setTheme: <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => void;
}

// Initial theme state, mirroring src/index.css :root for light mode
const initialState: ThemeState = {
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  primary: '222.2 47.4% 11.2%',
  secondary: '210 40% 96.1%',
  destructive: '0 84.2% 60.2%',
  card: '0 0% 100%',
  border: '214.3 31.8% 91.4%',
  radius: 0.5,
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeState>(initialState);

  // Function to update a single theme property
  const setTheme = <K extends keyof ThemeState>(key: K, value: ThemeState[K]) => {
    setThemeState(prev => ({ ...prev, [key]: value }));
  };

  // Effect to apply theme variables to the document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--foreground', theme.foreground);
    root.style.setProperty('--card', theme.card);
    root.style.setProperty('--card-foreground', theme.foreground);
    root.style.setProperty('--popover', theme.card);
    root.style.setProperty('--popover-foreground', theme.foreground);
    root.style.setProperty('--primary', theme.primary);
    // These foregrounds are kept constant for simplicity, but could also be part of the theme state
    root.style.setProperty('--primary-foreground', '210 40% 98%');
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--secondary-foreground', theme.primary);
    root.style.setProperty('--muted', theme.secondary);
    root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
    root.style.setProperty('--accent', theme.secondary);
    root.style.setProperty('--accent-foreground', theme.primary);
    root.style.setProperty('--destructive', theme.destructive);
    root.style.setProperty('--destructive-foreground', '210 40% 98%');
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--input', theme.border);
    root.style.setProperty('--ring', theme.primary);
    root.style.setProperty('--radius', `${theme.radius}rem`);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};