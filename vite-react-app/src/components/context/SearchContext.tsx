import React, { createContext, useState } from "react";

export interface SearchContextType {
  search: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = createContext<any>({});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
