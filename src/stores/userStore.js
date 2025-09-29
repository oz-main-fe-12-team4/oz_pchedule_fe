import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isAdmin: null,

      setIsAdmin: (state) => set({ isAdmin: state }),
    }),
    {
      name: "isAdminStorage",
    }
  )
);

export default useUserStore;
