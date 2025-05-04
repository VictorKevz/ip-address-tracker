export type SearchHistoryItem = {
  ip: string;
  country: string;
  region: string;
  timezone: string;
  isp: string;
  lat: number;
  lng: number;
};

export interface SearchHistoryContextType {
  searchHistory: SearchHistoryItem[];
  isDropDownOpen: boolean;
  toggleDropDown: () => void;
  showDialog: boolean;
  toggleDialog: (currentIp: string) => void;
  updateSearchHistory: (newSearch: SearchHistoryItem) => void;
  onDelete: (currentIp: string) => void;
  currentIp: string;
}
