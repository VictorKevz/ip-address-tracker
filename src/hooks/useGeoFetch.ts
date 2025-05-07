import { useCallback } from "react";
import { SearchItem } from "../types/IpSearch";
import { emptySearchItem } from "../types/IpSearch";

type GeoFetchResult = {
  fetchData: (url: string) => Promise<SearchItem | null>;
};

export const useGeoFetch = (): GeoFetchResult => {
  const fetchData = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch IP location data");

      const data = await response.json();

      return {
        ip: data.ip,
        country: data?.location?.country,
        region: data?.location?.region,
        timezone: data?.location?.timezone,
        isp: data?.isp,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
      };
    } catch (error) {
      console.error(error);
      return emptySearchItem;
    }
  }, []);

  return { fetchData };
};
