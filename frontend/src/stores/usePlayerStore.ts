import Song from "@/types";
import { create } from "zustand";

// NOTE: This interface defines the structure of the music player store.
interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  // NOTE: Functions to manipulate the music player state
  initQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

// NOTE: Zustand store to manage player state
export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // NOTE: Initial state
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  // NOTE: Initializes the queue with a list of songs
  initQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  // NOTE: Plays an album starting from a given index (default: first song)
  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    set({
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  // NOTE: Sets a new song as the current song and starts playing
  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: get().currentIndex === -1 ? songIndex : get().currentIndex,
    });
  },

  // NOTE: Toggles between play and pause
  togglePlay: () => {
    set((state) => ({
      isPlaying: !state.isPlaying,
    }));
  },

  // NOTE: Moves to the next song in the queue
  playNext: () => {
    const currentIndex = get().currentIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= get().queue.length) {
      set({
        currentIndex: 0,
        isPlaying: false,
      });
      return;
    }

    set({
      currentSong: get().queue[nextIndex],
      currentIndex: nextIndex,
      isPlaying: true,
    });
  },

  // NOTE: Moves to the previous song in the queue
  playPrevious: () => {
    const currentIndex = get().currentIndex;
    const previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      set({
        currentIndex: get().queue.length - 1,
        isPlaying: false,
      });
      return;
    }

    set({
      currentSong: get().queue[previousIndex],
      currentIndex: previousIndex,
      isPlaying: true,
    });
  },
}));
