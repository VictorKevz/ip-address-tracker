import { emptySearchItem, SearchItem } from "../types/IpSearch";

export const getInitialIpState = (): SearchItem => {
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
