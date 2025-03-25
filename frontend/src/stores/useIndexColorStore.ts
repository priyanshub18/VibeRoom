import { create } from "zustand";

interface FindingIndexColorStore {
  idx: number;
  colors: string[];
  setIndex: () => void;
}

export const useIndexColorStore = create<FindingIndexColorStore>((set, get) => ({
  idx: 0,
  colors: ["text-blue-400", "text-red-400", "text-green-400", "text-yellow-400"],
  setIndex: () => {
    const { colors } = get();
    set({ idx: Math.floor(Math.random() * colors.length) });
  },
}));
