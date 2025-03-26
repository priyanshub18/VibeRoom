import { customToast } from "@/components/ToastThings/SelfMadeToast";
import { axiosInstance } from "@/lib/axios";
import Song, { Album, Stats } from "@/types";
import { toast } from "sonner";
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
  stats: Stats;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  fetchAlbum: (albumId: string) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  // fetchSongs: (albumId: string) => Promise<void>;
}
export const useMusicStore = create<MusicStore>((set, get) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  },
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

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data, error: null });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/songs");

      set({
        songs: response.data,
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

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      get().fetchStats();
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      customToast("Song deleted successfully");
    } catch (error: any) {
      console.log("Error in deleteSong", error);
      customToast("Error deleting song", "error");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      get().fetchStats();
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) => (song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song)),
      }));
      customToast("Album deleted successfully");
    } catch (error: any) {
      customToast("Error deleting album", "error");
    } finally {
      set({ isLoading: false });
    }
  },
}));
