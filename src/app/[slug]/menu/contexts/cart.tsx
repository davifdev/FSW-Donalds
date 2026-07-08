"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { Product } from "../../../../../generated/prisma/client";

interface CartProduct extends Pick<
  Product,
  "id" | "name" | "imageUrl" | "price"
> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
