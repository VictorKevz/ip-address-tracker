import { SearchItem } from "./IpSearch";

export interface SearchHistoryContextType {
  searchHistory: SearchItem[];
  isDropDownOpen: boolean;
  toggleDropDown: () => void;
  showDialog: boolean;
  toggleDialog: (currentIp: string) => void;
  updateSearchHistory: (newSearch: SearchItem) => void;
  onDelete: (currentIp: string) => void;
  currentIp: string;
  showAlert: boolean;
}
