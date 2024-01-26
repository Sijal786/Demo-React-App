import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  interface Product {
    id: string;
    name: string;
    images: string[];
    description: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  console.log(isAuthenticated);

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
      console.log("data for products: ", data.data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        products={products}
        setProducts={setProducts}
      />
      <MainPage
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        products={products}
      />
    </>
  );
}
