import React, { createContext, useState, ReactNode } from "react";
import { Item } from "./types";

// ✅ Exported so you can import it in ListView / DetailView
export interface ItemsContextType {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}
