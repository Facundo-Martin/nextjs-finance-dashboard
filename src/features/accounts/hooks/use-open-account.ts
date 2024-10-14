import { create } from "zustand";

type State = {
  id?: string;
  isOpen: boolean;
};

type Actions = {
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useOpenAccountStore = create<State & Actions>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
