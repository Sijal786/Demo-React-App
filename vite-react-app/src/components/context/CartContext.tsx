import React, { createContext } from "react";
import { useState } from "react";
import { Product } from "../../shared/interfaces/Interface";


export interface CartContextType {
  cartItems: any;
  addToCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState([] as any);

  const addToCart = (product: Product) => {
    console.log("Add to Cart is clicked", product.id);
    console.log(product);

    // Check if the product is already in the cart
    const cartItemIndex = cartItems.findIndex(
      (item: Product) => item.id === product.id
    );

    if (cartItemIndex !== -1) {
      // If the product is already in the cart, update its amount
      const updatedCartItems = [...cartItems];
      updatedCartItems[cartItemIndex].amount += 1;
      setCartItems(updatedCartItems);
      console.log(
        "Item already exists in the cart, updated quantity:",
        updatedCartItems[cartItemIndex].amount
      );
    } else {
      // If the product is not in the cart, add it with amount set to 1
      setCartItems((prev: Product[]) => [...prev, { ...product, amount: 1 }]);
      console.log("Item added to cart");
    }
    console.log("=========Final Cart Items", cartItems);
  };

  const cartContext: CartContextType = {
    cartItems,
    addToCart,
  };

  return (
    <>
      <CartContext.Provider value={cartContext}>
        {children}
      </CartContext.Provider>
    </>
  );
};
