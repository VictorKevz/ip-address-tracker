/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  IpSearchContextType,
  ProviderProps,
  SearchUIState,
  emptySearchItem,
  SearchItem,
} from "../types/IpSearch";
import { isIP } from "is-ip";
import { isDomain } from "../utils/regex";
import { useSearchHistory } from "./SearchHistoryContext";
import { useGeoFetch } from "../hooks/useGeoFetch";

export const IpSearchContext = createContext<IpSearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: ProviderProps) => {
  // Initializer....................................................
  const getInitialIpState = (): SearchItem => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("searchHistory");
      if (stored) {
        const parsed = JSON.parse(stored) as SearchItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      }
    }
    return emptySearchItem;
  };

  // States....................................................
  const [ipState, setIpState] = useState<SearchItem>(getInitialIpState()); // holds the current searchItem
  const [uiState, setUIState] = useState<SearchUIState>({
    isLoading: true,
    error: null,
  });

  const [inputValue, setInputValue] = useState<string>(ipState?.ip || ""); // holds what the user types in...
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const { updateSearchHistory, searchHistory, handleAlert } =
    useSearchHistory();

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
  const { fetchData } = useGeoFetch();

  // Handlers....................................................
  const handleSearchInput = useCallback((query: string) => {
    setInputValue(query);
    setInputValid(true);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = inputValue?.trim();

      if (!input || (!isIP(input) && !isDomain(input))) {
        setInputValid(false);
        return;
      }

      const existingItem = searchHistory.find((item) => item.ip === inputValue);
      if (existingItem) {
        setIpState(existingItem);
        return;
      }

      const url = isIP(input)
        ? `${baseUrl}&ipAddress=${input}`
        : `${baseUrl}&domain=${input}`;

      setUIState({ isLoading: true, error: null });

      const fetchedData = await fetchData(url);

      if (fetchedData) {
        setIpState(fetchedData);
        handleAlert({
          message: "Location Found",
          show: true,
          severity: "success",
        });
      } else {
        setIpState(emptySearchItem);
        setUIState({ isLoading: false, error: "We couldn’t find anything." });
        handleAlert({
          message: "We couldn’t find anything.",
          show: true,
          severity: "error",
        });
      }

      setInputValid(true);
      setInputValue("");
    },
    [inputValue, searchHistory, baseUrl, fetchData]
  );

  const updateIpState = useCallback((currentItem: SearchItem) => {
    setIpState(currentItem);
  }, []);

  // Side effects...................................................
  useEffect(() => {
    //checks if there's data already and if not it fetches the data
    if (!ipState.ip) {
      fetchData(baseUrl);
    } else {
      setUIState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (ipState.ip) {
      setInputValue(ipState.ip);
      const newItem = {
        ip: ipState.ip,
        country: ipState?.country,
        region: ipState?.region,
        timezone: ipState?.timezone,
        isp: ipState?.isp,
        lat: ipState?.lat,
        lng: ipState?.lng,
      };
      updateSearchHistory(newItem);
      setUIState({ isLoading: false, error: "" });
    }
  }, [ipState]);
  return (
    <IpSearchContext.Provider
      value={{
        ipState,
        handleSearchInput,
        onSubmit: handleSubmit,
        isInputValid,
        inputValue,
        updateIpState,
        uiState,
      }}
    >
      {children}
    </IpSearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(IpSearchContext);
  if (!context)
    throw new Error("useSearchContext must be used within a SearchProvider");
  return context;
};
