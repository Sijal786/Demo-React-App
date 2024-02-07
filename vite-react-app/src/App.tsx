import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import { useState } from "react";
import SearchProvider from "./components/context/SearchContext";
import { useEffect } from "react";
import { createContext } from "react";
import { Product } from "./shared/interfaces/Interface";
import { getAPIResult } from "./services/axios";
import { ProductContextType } from "./shared/interfaces/Interface";


export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [products, setProducts] = useState([] as Product[]);

  const productContext: ProductContextType = {
    products,
    setProducts,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const url = "https://api.stripe.com/v1/products";
    const products = await getAPIResult(url);
    console.log("======Products", products);
    setProducts(products);
  };

  return (
    <>
      <ProductContext.Provider value={productContext}>
      
        <SearchProvider>
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
