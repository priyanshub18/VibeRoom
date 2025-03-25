import { axiosInstance } from "@/lib/axios";
import Song, { Album } from "@/types";
import { create } from "zustand";
export interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: any;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbum: (albumId: string) => Promise<void>;
  // fetchSongs: (albumId: string) => Promise<void>;
}
export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

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
  fetchAlbum: async (albumId: string) => {
    //NOTE: put the fetching logic in here
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get(`/albums/${albumId}`);
      set({
        currentAlbum: response.data,
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
