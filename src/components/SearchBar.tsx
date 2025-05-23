import { Error, KeyboardArrowRight } from "@mui/icons-material";
import { useSearchContext } from "../context/IpSearchContext";
import { ChangeEvent } from "react";
import { Spinner } from "./Spinner";

const SearchBar = () => {
  const { uiState, inputValue, handleSearchInput, onSubmit, isInputValid } =
    useSearchContext();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchInput(e.target.value);
  };
  return (
    <form
      className="max-w-xl w-full flex items-center shadow-2xl relative"
      onSubmit={onSubmit}
      autoComplete="off"
      role="search"
      aria-label="Search IP or domain"
    >
      {/* Hidden label for accessibility */}
      <label htmlFor="searchBar" className="sr-only">
        Search for any IP address or domain
      </label>

      <div
        className={`w-full flex items-center rounded-l-lg relative transition-all duration-300 ease-in-out ${
          !isInputValid && "border border-[var(--red-100)]"
        }`}
      >
        <input
          type="text"
          name="ipAddress"
          id="searchBar"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for any IP address or domain"
          aria-invalid={!isInputValid}
          aria-describedby={!isInputValid ? "input-error" : undefined}
          className="w-full h-14 bg-[var(--neutral-50)] rounded-l-lg focus:border border-[var(--primary-color)] text-[var(--neutral-900)] pl-4 placeholder:text-[var(--neutral-300)] caret-[var(--primary-color)]"
        />

        {!isInputValid && (
          <Error
            className="text-[var(--red-100)] absolute right-4"
            role="img"
            aria-label="Error icon"
          />
        )}

        {uiState.isLoading && (
          <div className="absolute left-[50%]" aria-hidden="true">
            <Spinner />
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`w-14 h-14 bg-[var(--primary-color)] text-[var(--white)] rounded-r-lg ${
          !isInputValid && "bg-[var(--red-100)]"
        }`}
        aria-label="Submit search"
      >
        <KeyboardArrowRight fontSize="large" />
      </button>

      {!isInputValid && (
        <div
          id="input-error"
          className="absolute bottom-0 left-4 top-[100%] mt-1 w-full bg-[var(--red-100)] text-sm text-[var(--red-100)]"
          role="alert"
        >
          Please provide a valid domain or IP address!
        </div>
      )}
    </form>
  );
};

export default SearchBar;
