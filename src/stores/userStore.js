import { createStore } from "zustand";

export const useUserStore = createStore((set) => ({
  userData: {},

  setUserData: (newUserData) => set({ userData: newUserData }),
  clearUserData: () => set({ userData: {} }),
}));
