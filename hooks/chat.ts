"use client";
import { create } from "zustand";

type chatElement = {
  sender: "me" | "bot";
  message: string;
};
const defaultValue: chatElement[] = [
  {
    sender: "bot",
    message: "Bonjour, en quoi puis-je vous aider aujourd'hui?",
  },
];

interface chatState {
  discussion: chatElement[];
  addChat: (newChat: chatElement) => void;
}
export const useChatStore = create<chatState>((set, get) => ({
  discussion: defaultValue,
  addChat: (newChat: string) => {
    return set(() => ({
      discussion: [...get().discussion, newChat],
    }));
  },
}));
