import { create } from 'zustand';

interface ThemeState {
  bgColor: string;
  setBgColor: (color: string) => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  bgColor: 'rgb(255, 255, 255)',
  setBgColor: (color) => set({ bgColor: color }),
}));

export default useThemeStore; 