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
  showAlert: AlertType;
  handleAlert: (update: AlertType) => void;
}
type severityType = "error" | "info" | "success" | "warning";
export interface AlertType {
  show: boolean;
  message: string;
  severity: severityType;
}
