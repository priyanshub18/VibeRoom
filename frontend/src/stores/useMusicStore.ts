import { axiosInstance } from "@/lib/axios";
import Song, { Album } from "@/types";
import { create } from "zustand";
export interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: any;
  currentAlbum: Album | null;

  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];

  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
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
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],

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

  fetchFeaturedSongs: async () => {
    //NOTE: put the fetching logic in here
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/songs/feature");
      set({
        featuredSongs: response.data,
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
  fetchTrendingSongs: async () => {
    //NOTE: put the fetching logic in here
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({
        trendingSongs: response.data,
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
  fetchMadeForYouSongs: async () => {
    //NOTE: put the fetching logic in here
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({
        madeForYouSongs: response.data,
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
