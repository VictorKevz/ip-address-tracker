/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  SearchHistoryContextType,
  SearchHistoryItem,
} from "../types/searchHistory";
import { ProviderProps } from "../types/IpSearch";

export const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export const SearchHistoryProvider = ({ children }: ProviderProps) => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isDropDownOpen, setDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setDropDown(!isDropDownOpen);
  };

  const updateSearchHistory = (newSearch: SearchHistoryItem) => {
    setSearchHistory((prev) => {
      const exists = prev.find((item) => item.ip === newSearch.ip);
      if (exists) return prev;
      return [...prev, newSearch];
    });
  };
  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        isDropDownOpen,
        toggleDropDown,
        updateSearchHistory,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context)
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  return context;
};
