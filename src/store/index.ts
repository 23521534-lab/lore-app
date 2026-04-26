import { create } from 'zustand';
import { SampleItems, SampleBoards } from '../constants';

export interface MediaItem {
  id: string;
  type: 'film' | 'book' | 'music' | 'youtube' | 'podcast' | 'game' | 'course';
  title: string;
  creator: string;
  year: string;
  gradient: readonly string[];
  status: string;
  tags: string[];
  note: string;
  coverUrl?: string;
  dateAdded?: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  gradient: readonly string[];
  items?: string[];
}

interface LoreStore {
  items: MediaItem[];
  boards: Board[];
  activeFilter: string;
  setFilter: (f: string) => void;
  addItem: (item: MediaItem) => void;
  updateItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteItem: (id: string) => void;
  addBoard: (board: Board) => void;
  getItemsByType: (type: string) => MediaItem[];
  getStats: () => { watched: number; books: number; saved: number; channels: number };
}

export const useLoreStore = create<LoreStore>((set, get) => ({
  items: SampleItems as MediaItem[],
  boards: SampleBoards as Board[],
  activeFilter: 'all',

  setFilter: (f) => set({ activeFilter: f }),

  addItem: (item) =>
    set((s) => ({
      items: [{ ...item, dateAdded: new Date().toISOString() }, ...s.items],
    })),

  updateItem: (id, updates) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),

  deleteItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  addBoard: (board) =>
    set((s) => ({ boards: [board, ...s.boards] })),

  getItemsByType: (type) => {
    const { items } = get();
    if (type === 'all') return items;
    return items.filter((i) => i.type === type);
  },

  getStats: () => {
    const { items } = get();
    return {
      watched: items.filter((i) => i.type === 'film' && i.status === 'watched').length,
      books: items.filter((i) => i.type === 'book').length,
      saved: items.filter((i) => i.status === 'saved' || i.status === 'want').length,
      channels: items.filter((i) => i.type === 'youtube' || i.type === 'podcast').length,
    };
  },
}));
