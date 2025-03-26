import { create } from "zustand";

interface ShowPlayerStore {
  closePlayer: boolean;
  toggleClosePlayer: () => void;
  setClosePlayer: () => void;
}

export const useShowPlayerStore = create<ShowPlayerStore>((set, get) => ({
  closePlayer: false,
  toggleClosePlayer: () => set({ closePlayer: !get().closePlayer }),
  setClosePlayer: () => set({ closePlayer: false }),
}));
