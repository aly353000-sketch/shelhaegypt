import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: (ar: string, en?: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Arabic only as requested by user
  const lang: Language = 'ar';
  // Daylight / Light mode only as requested by user ("خلي نهار فقط")
  const theme: Theme = 'light';

  useEffect(() => {
    // Lock HTML to Arabic RTL
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark');
  }, []);

  const setLang = () => {};
  const toggleLang = () => {};
  const setTheme = () => {};
  const toggleTheme = () => {};

  // Always return Arabic text
  const t = (ar: string, _en?: string) => ar;

  return (
    <AppContext.Provider value={{ lang, setLang, toggleLang, theme, setTheme, toggleTheme, t }}>
      <div className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

