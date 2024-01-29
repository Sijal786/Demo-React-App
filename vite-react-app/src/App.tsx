import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import { SetStateAction, useState } from "react";
import SearchProvider from "./components/context/SearchContext";
import { useEffect } from "react";
import { createContext } from "react";
import { Product } from "./shared/interfaces/Interface";


export interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);


export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [products, setProducts] = useState([] as Product[])

  const productContext: ProductContextType = {
    products,
    setProducts,
  };
  
  console.log(isAuthenticated);

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
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductContext.Provider  value={productContext}>
      <SearchProvider >
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <MainPage
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        </SearchProvider>
        </ProductContext.Provider>
    </>
  );
}




