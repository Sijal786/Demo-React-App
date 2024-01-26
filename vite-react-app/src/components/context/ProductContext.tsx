import React, { SetStateAction, createContext, useState } from "react";
import { useEffect } from "react";

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    
  const [products, setProducts] = useState<Product[]>([]);

  const productContext: ProductContextType = {
    products,
    setProducts,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const options = {
      headers: {
        Authorization:
          "Bearer sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT",
      },
    };
    try {
      const response = await fetch(
        "https://api.stripe.com/v1/products",
        options as any
      );

      const data = await response.json();

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductContext.Provider value={productContext}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};
