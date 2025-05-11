import { create } from 'zustand';

const useThemeStore = create((set) => ({
  bgColor: 'rgb(15, 60, 75)',
  setBgColor: (color) => set({ bgColor: color }),
}));

export default useThemeStore;