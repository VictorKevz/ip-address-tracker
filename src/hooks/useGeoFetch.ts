import { useCallback, useState } from "react";
import { SearchItem, SearchUIState } from "../types/IpSearch";
import { emptySearchItem } from "../types/IpSearch";
import { getInitialIpState } from "../utils/localStorageInitializer";

export const useGeoFetch = () => {
  const [ipState, setIpState] = useState<SearchItem>(getInitialIpState()); // holds the current searchItem
  const [uiState, setUIState] = useState<SearchUIState>({
    isLoading: true,
    error: null,
  });
  const fetchData = useCallback(async (url: string): Promise<SearchItem> => {
    try {
      setUIState({ isLoading: true, error: null });

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch IP location data");

      const data = await response.json();
      const result: SearchItem = {
        ip: data.ip,
        country: data?.location?.country,
        region: data?.location?.region,
        timezone: data?.location?.timezone,
        isp: data?.isp,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
      };

      setIpState(result);
      setUIState({ isLoading: false, error: null });
      return result;
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Location not found";
      setIpState(emptySearchItem);
      setUIState({ isLoading: false, error: errorMessage });
      return emptySearchItem;
    }
  }, []);

  return { ipState, fetchData, uiState, setIpState, setUIState };
};
