import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
export interface MusicStore {
  albums: any[];
  songs: any[];
  isLoading: boolean;
  error: any;
  fetchAlbums: () => Promise<void>;
}
export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    //NOTE: put the fetching logic in here
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/albums");
      set({
        albums: response.data,
        error: null,
      });
    } catch (error) {
      set({
        error: error,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
