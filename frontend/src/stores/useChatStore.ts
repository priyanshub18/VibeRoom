import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  users: [];
  isLoading: boolean;
  err: string | null | unknown;
  fetchUsers: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  err: null,
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/users");
      console.log({ response });
      set({ users: response.data });
    } catch (error: any) {
      set({ err: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
