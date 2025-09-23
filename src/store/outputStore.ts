import { create } from "zustand";

export interface OutputStore {
  output: unknown | null;
  setOutput: (output: unknown) => void;
  clearOutput: () => void;
}

export const useOutputStore = create<OutputStore>((set) => ({
  output: null,
  setOutput: (output) => set({ output }),
  clearOutput: () => set({ output: null }),
}));
