/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AlertType, SearchHistoryContextType } from "../types/searchHistory";
import { ProviderProps, SearchItem } from "../types/IpSearch";

export const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export const SearchHistoryProvider = ({ children }: ProviderProps) => {
  const getInitialSearchHistory = (): SearchItem[] => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("searchHistory");
      if (saved !== null) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error("Failed to parse search history:", error);
        }
      }
    }
    return [];
  };
  // States.........................................
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>(
    getInitialSearchHistory
  );
  const [isDropDownOpen, setDropDown] = useState<boolean>(false);
  const [showDialog, setDialog] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const [currentIp, setCurrentIp] = useState<string>("");

  // Hnadlers..................................................
  const toggleDropDown = () => {
    setDropDown(!isDropDownOpen);
  };
  const toggleDialog = (currentIp: string) => {
    setDialog(!showDialog);
    setCurrentIp(currentIp);
  };
  const handleAlert = (update: AlertType) => {
    setAlert(update);
    const timeOutId = setTimeout(() => {
      setAlert({
        message: update.message,
        severity: update.severity,
        show: false,
      });
    }, 3000);
    return () => clearTimeout(timeOutId);
  };
  const updateSearchHistory = (newSearch: SearchItem) => {
    setSearchHistory((prev) => {
      const exists = prev.find((item) => item.ip === newSearch.ip);
      if (exists) return prev;
      return [...prev, newSearch];
    });
  };

  const deleteEntry = (currentIp: string) => {
    if (searchHistory.length <= 1) return;
    setSearchHistory((prev) => prev.filter((item) => item.ip != currentIp));
    setDialog(false);

    handleAlert({
      message: "Deleted Successfully",
      show: true,
      severity: "success",
    });
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);
  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        isDropDownOpen,
        toggleDropDown,
        updateSearchHistory,
        onDelete: deleteEntry,
        showDialog,
        toggleDialog,
        currentIp,
        showAlert,
        handleAlert,
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
