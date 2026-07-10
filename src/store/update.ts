import { create } from 'zustand';

export const updateStore = create<{
  update: boolean;
  setUpdate: (update: boolean) => void;
}>((set) => ({
  update: false,
  setUpdate: (update: boolean) => set({ update }),
}));
