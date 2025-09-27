import { create } from "zustand";

const useUserStore = create((set) => ({
  userData: null,
  isAdmin: false,

  setIsAdmin: (state) => set({ isAdmin: state }),
  setUserData: (newUserData) => set({ userData: newUserData }),
  clearUserData: () => set({ userData: null }),
}));

export default useUserStore;
