/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AlertType, SearchHistoryContextType } from "../types/searchHistory";
import { ProviderProps, SearchItem } from "../types/IpSearch";

export const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>(undefined);

export const SearchHistoryProvider = ({ children }: ProviderProps) => {
  // Initializer.......................................
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
  ); // holds all the searched data - could be limited to 10.
  const [isDropDownOpen, setDropDown] = useState<boolean>(false);
  const [showDialog, setDialog] = useState<boolean>(false);
  const [showAlert, setAlert] = useState<AlertType>({
    show: false,
    message: "",
    severity: "success",
  });
  const [currentIp, setCurrentIp] = useState<string>(""); // holds the ip of the currently deleted item

  // Handlers..................................................
  const toggleDropDown = useCallback((value: boolean) => {
    setDropDown(value);
  }, []);

  const toggleDialog = useCallback((currentIp: string) => {
    setDialog((prev) => !prev);
    setCurrentIp(currentIp);
  }, []);

  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAlert = useCallback((update: AlertType) => {
    setAlert(update);

    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    alertTimeout.current = setTimeout(() => {
      setAlert({ ...update, show: false });
    }, 3000);
  }, []);

  const updateSearchHistory = useCallback((newSearch: SearchItem) => {
    setSearchHistory((prev) => {
      const exists = prev.find((item) => item.ip === newSearch.ip);
      if (exists) return prev;

      const updated = [...prev, newSearch];
      return updated.length > 6 ? updated.slice(-6) : updated;
    });
  }, []);

  const deleteEntry = useCallback(
    (currentIp: string) => {
      setSearchHistory((prev) => {
        if (prev.length <= 1) return prev;
        const updated = prev.filter((item) => item.ip !== currentIp);

        if (updated.length !== prev.length) {
          setDialog(false);
          handleAlert({
            message: "Deleted Successfully",
            show: true,
            severity: "success",
          });
        }

        return updated;
      });
    },
    [handleAlert]
  );

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
