import { ReactNode } from "react";

export interface IpState {
  ip: string | null;
  country: string | null;
  region: string | null;
  timezone: string | null;
  isp: string | null;
  lat: number | null;
  lng: number | null;
  error: string | null;
  isLoading: boolean;
}
export interface IpSearchContextType {
  ipState: IpState;
  handleSearchInput: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isInputValid: boolean;
  inputValue: string;
}

export type IpSearchProviderProps = {
  children: ReactNode;
};
