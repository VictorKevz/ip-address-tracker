import { ReactNode } from "react";
import { SearchHistoryItem } from "./searchHistory";

export interface SearchItem {
  ip: string;
  country: string;
  region: string;
  timezone: string;
  isp: string;
  lat: number;
  lng: number;
}
export const emptySearchItem: SearchItem = {
  ip: "",
  country: "",
  region: "",
  timezone: "",
  isp: "",
  lat: 0,
  lng: 0,
};
export type SearchUIState = {
  isLoading: boolean;
  error: string | null;
};
export interface IpSearchContextType {
  ipState: SearchItem;
  handleSearchInput: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isInputValid: boolean;
  inputValue: string;
  updateIpState: (currentItem: SearchHistoryItem) => void;
  uiState: SearchUIState;
}

export type ProviderProps = {
  children: ReactNode;
};
