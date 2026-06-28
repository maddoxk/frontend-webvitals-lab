import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { cartItemCount, cartSubtotalCents } from './format';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  seed: string;
  qty: number;
}

type Action =
  | { type: 'add'; item: Omit<CartItem, 'qty'>; qty?: number }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.item.id);
      const add = action.qty ?? 1;
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + add } : i
        );
      }
      return [...state, { ...action.item, qty: add }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'setQty':
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
      );
    case 'clear':
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartItemCount(items),
      subtotalCents: cartSubtotalCents(items),
      add: (item, qty) => dispatch({ type: 'add', item, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
