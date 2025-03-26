import { create } from "zustand";

export interface IsVibeCheckHiddenStore {
  isVibeCheckHidden: boolean;
  setIsVibeCheckHidden: (isVibeCheckHidden: boolean) => void;
}

export const useIsVibeCheckHiddenStore = create<IsVibeCheckHiddenStore>((set) => ({
  isVibeCheckHidden: false,
  setIsVibeCheckHidden: (isVibeCheckHidden) => set({ isVibeCheckHidden }),
}));
