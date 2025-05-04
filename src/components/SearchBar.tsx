import { Error, KeyboardArrowRight } from "@mui/icons-material";
import { useSearchContext } from "../context/IpSearchContext";
import { ChangeEvent } from "react";
import { Spinner } from "./Spinner";

const SearchBar = () => {
  const { ipState, inputValue, handleSearchInput, onSubmit, isInputValid } =
    useSearchContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchInput(e.target.value);
  };
  return (
    <form
      className="max-w-xl w-full flex items-center shadow-2xl relative"
      onSubmit={onSubmit}
    >
      <label
        htmlFor="searchBar"
        className="w-full flex items-center bg-[var(--neutral-50)] rounded-l-lg relative"
      >
        <input
          type="text"
          name="ipAddress"
          value={inputValue}
          id="searchBar"
          onChange={handleChange}
          placeholder="Search for any IP address or domain"
          className={`w-full h-14 text-[var(--neutral-900)] pl-4 placeholder:text-[var(--neutral-300)] ${
            !isInputValid && "border border-[var(--red-100)]"
          } focus:border border-[var(--primary-color)] rounded-l-2xl caret-[var(--primary-color)]`}
        />
        {!isInputValid && (
          <Error className="text-[var(--red-100)] absolute right-4" />
        )}
        {ipState.isLoading && (
          <div className="absolute left-[50%]">
            <Spinner />
          </div>
        )}
      </label>
      <button
        type="submit"
        className={`w-14 h-14 bg-[var(--primary-color)] text-[var(--white)] rounded-r-lg ${
          !isInputValid && "bg-[var(--red-100)]"
        }`}
      >
        <KeyboardArrowRight fontSize="large" />
      </button>
      {!isInputValid && (
        <div className="absolute bottom-0 left-4 top-[100%] mt-1 w-full bg-[var(--red-100)] text-sm text-[var(--red-100)]">
          Please provide a valid domain or IP address!
        </div>
      )}
    </form>
  );
};

export default SearchBar;
