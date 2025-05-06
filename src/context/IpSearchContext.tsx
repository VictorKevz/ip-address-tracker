/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
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

export const IpSearchContext = createContext<IpSearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: ProviderProps) => {
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
  const [ipState, setIpState] = useState<SearchItem>(getInitialIpState());
  const [uiState, setUIState] = useState<SearchUIState>({
    isLoading: true,
    error: null,
  });

  const [inputValue, setInputValue] = useState<string>(ipState?.ip || "");
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const { updateSearchHistory, searchHistory, handleAlert } =
    useSearchHistory();

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

  const handleSearchInput = (query: string) => {
    setInputValue(query);
    setInputValid(true); // remove error state when typing
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputValue?.trim();

    // validation
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

    setUIState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));
    fetchData(url);

    // Reset state after data is fetched
    setInputValid(true);
    setInputValue("");
    setIpState(emptySearchItem);
  };
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Failed to fetch ip address location data");
      const data = await response.json();
      setIpState({
        ip: data.ip,
        country: data?.location?.country,
        region: data?.location?.region,
        timezone: data?.location?.timezone,
        isp: data?.isp,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
      });
      setUIState((prev) => ({ ...prev, isLoading: false }));
      handleAlert({
        message: "Location Found",
        show: true,
        severity: "success",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setUIState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));

      setIpState(emptySearchItem);
      handleAlert({
        message: "We couldn’t find anything.",
        show: true,
        severity: "error",
      });
    }
  };
  const updateIpState = (currentItem: SearchItem) => {
    setIpState(currentItem);
  };
  useEffect(() => {
    //checks if there's data already and if not it fetches the data
    if (ipState.ip === "") {
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
    throw new Error("useSearchContext must be used within a ThemeProvider");
  return context;
};
