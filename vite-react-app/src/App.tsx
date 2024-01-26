import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import { createContext, useState } from "react";
import SearchProvider from "./components/context/SearchContext";

// interface SearchContextType {
//   search: string;
//   setSearchValue: (value: string) => void;
// }
export const SearchContextNew = createContext<any>({});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  console.log(isAuthenticated);


  return (
    <>
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
    </>
  );
}
