/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  IpState,
  IpSearchContextType,
  IpSearchProviderProps,
} from "../types/IpSearch";
import { isIP } from "is-ip";
import { isDomain } from "../utils/regex";

export const IpSearchContext = createContext<IpSearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: IpSearchProviderProps) => {
  const [ipState, setIpState] = useState<IpState>({
    ip: null,
    country: null,
    region: null,
    timezone: null,
    lat: null,
    lng: null,
    isp: null,
    error: null,
    isLoading: true,
  });
  const [inputValue, setInputValue] = useState<string>(ipState?.ip || "");
  const [isInputValid, setInputValid] = useState<boolean>(true);
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
  const handleSearchInput = (query: string) => {
    setInputValue(query);
    setInputValid(true); // remove error state when typing
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputValue?.trim();
    // validation......................
    if (!input) {
      setInputValid(false);
      return;
    }

    let url = "";
    if (isIP(input)) {
      url = `${baseUrl}&ipAddress=${input}`;
    } else if (isDomain(input)) {
      url = `${baseUrl}&domain=${input}`;
    }

    fetchData(url);

    // Reset state after data is fetched
    setInputValid(true);
    setInputValue("");
    setIpState({
      ip: null,
      country: null,
      region: null,
      timezone: null,
      isp: null,
      lat: null,
      lng: null,
      error: null,
      isLoading: true,
    });
  };
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("Failed to fetch ip address location data");
      const data = await response.json();
      console.log("Data", data);
      setIpState({
        ip: data.ip,
        country: data?.location?.country,
        region: data?.location?.region,
        timezone: data?.location?.timezone,
        isp: data?.isp,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
        error: null,
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setIpState({
        ip: null,
        country: null,
        region: null,
        timezone: null,
        isp: null,
        lat: null,
        lng: null,
        error: errorMessage,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchData(baseUrl);
  }, [baseUrl]);

  useEffect(() => {
    if (ipState.ip) {
      setInputValue(ipState.ip);
    }
  }, [ipState.ip]);
  return (
    <IpSearchContext.Provider
      value={{
        ipState,
        handleSearchInput,
        onSubmit: handleSubmit,
        isInputValid,
        inputValue,
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
