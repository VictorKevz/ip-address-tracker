import {
  CancelRounded,
  CheckCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useSearchHistory } from "../../context/SearchHistoryContext";
import { useSearchContext } from "../../context/IpSearchContext";
import { SearchHistoryItem } from "../../types/searchHistory";

export const SearchHistory = () => {
  const { isDropDownOpen, toggleDropDown, searchHistory, onDelete } =
    useSearchHistory();
  const { updateIpState, ipState } = useSearchContext();
  const handleStateUpdate = (item: SearchHistoryItem) => {
    updateIpState(item);
    toggleDropDown();
  };
  return (
    <div className="relative w-full flex flex-col items-end z-100">
      <button
        type="button"
        onClick={toggleDropDown}
        className="h-12 w-full sm:w-fit px-3 rounded-lg bg-[var(--neutral-50)] text-[var(--neutral-900)] border border-[var(--neutral-100)] gap-2"
      >
        History
        {isDropDownOpen ? (
          <KeyboardArrowDown
            className="text-[var(--primary-color)]"
            fontSize="large"
          />
        ) : (
          <KeyboardArrowUp
            className="text-[var(--primary-color)]"
            fontSize="large"
          />
        )}
      </button>
      {isDropDownOpen && (
        <ul className="absolute top-[100%] mt-1 right-0 min-w-fit w-full bg-[var(--neutral-100)] rounded-xl shadow-2xl flex flex-col items-start flex-shrink-0 gap-6 px-4 py-5 border border-[var(--neutral-200)]">
          {searchHistory &&
            searchHistory.map((item) => {
              const isCurrent = item.ip === ipState.ip;

              return (
                <li
                  key={item.ip}
                  className={`w-full flex items-center justify-between gap-4 text-[var(--neutral-900)] border  p-2 rounded-lg ${
                    isCurrent
                      ? "border-[var(--primary-color)] bg-[#7a9af1]/10"
                      : "border-black/20 bg-black/5"
                  }`}
                >
                  <span className="text-sm min-w-max">{`${item?.region}, ${item?.country} - ${item?.ip}`}</span>
                  <span className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStateUpdate(item)}
                    >
                      <span className="sm:hidden text-[var(--primary-color)]">
                        <CheckCircle fontSize="medium" />
                      </span>
                      <span className="hidden sm:flex items-center justify-center h-10 bg-[var(--primary-color)] px-3.5 rounded-lg text-white">
                        Apply
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.ip)}
                      className=""
                    >
                      <span className="sm:hidden text-[var(--red-100)]">
                        <CancelRounded fontSize="medium" />
                      </span>
                      <span className="hidden sm:flex items-center justify-center h-10 bg-[var(--red-100)] px-3.5 rounded-lg text-white">
                        Remove
                      </span>
                    </button>
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
