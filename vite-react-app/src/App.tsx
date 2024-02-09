import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import SearchProvider from "./components/context/SearchContext";
import { useFetchProducts } from "./hooks/useFetchProducts";
import { createContext } from "react";
import Loading from "./shared/components/Loading";
import ShowErrorDialog from "./shared/dialogs/ShowErrorDialog";

export const ProductContext = createContext<any>(undefined);

export default function App() {
  const [products, setProducts] = useState([]);
  const { isLoading, data, error, isError }: any = useFetchProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProducts(data.data.data);
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowErrorDialog error={error.message} />;
  }

  return (
    <ProductContext.Provider value={products}>
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
  );
}
