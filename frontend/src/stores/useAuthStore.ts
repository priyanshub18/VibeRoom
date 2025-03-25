import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null | unknown;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  checkAdminStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/admin/check");
      console.log("Knowing what is the repsonse forom geting the admin status :", response);
      set({ isAdmin: response.data.admin, isLoading: false });
    } catch (error: any) {
        console.log("Knowing what is the error forom geting the admin status :", error);
      set({ isAdmin: false, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
