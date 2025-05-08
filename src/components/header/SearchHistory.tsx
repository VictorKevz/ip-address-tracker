/* eslint-disable react-hooks/exhaustive-deps */
import {
  CancelRounded,
  CheckCircle,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useSearchHistory } from "../../context/SearchHistoryContext";
import { useSearchContext } from "../../context/IpSearchContext";
import { SearchItem } from "../../types/IpSearch";
import { AnimatePresence, motion } from "framer-motion";
import { viewVariants } from "../../variants";
import { useEffect, useRef } from "react";

export const SearchHistory = () => {
  const { isDropDownOpen, toggleDropDown, searchHistory, toggleDialog } =
    useSearchHistory();
  const { updateIpState, ipState } = useSearchContext();
  const handleStateUpdate = (item: SearchItem) => {
    updateIpState(item);
    toggleDropDown(false);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const canDelete = searchHistory.length <= 1;
  return (
    <div
      ref={dropdownRef}
      className="relative w-full flex flex-col items-end z-100"
    >
      <button
        type="button"
        onClick={() => toggleDropDown(!isDropDownOpen)}
        className="group h-12 w-full sm:w-fit px-3 rounded-lg bg-[var(--neutral-50)] text-[var(--neutral-900)] border border-[var(--neutral-100)] gap-2 hover:bg-[var(--primary-color)] hover:text-[var(--white)] hover:border-transparent"
        aria-expanded={isDropDownOpen}
        aria-controls="history-dropdown"
      >
        <span className="sr-only">Toggle search history dropdown</span>
        History
        <KeyboardArrowDown
          className={`text-[var(--primary-color)] group-hover:text-[var(--white)] transition-transform ${
            isDropDownOpen ? "rotate-180" : ""
          }`}
          fontSize="large"
        />
      </button>

      <AnimatePresence>
        {isDropDownOpen && (
          <motion.ul
            id="history-dropdown"
            className="absolute top-[100%] mt-1 right-0 min-w-fit w-full bg-[var(--neutral-100)] rounded-xl shadow-2xl flex flex-col items-start flex-shrink-0 gap-6 px-4 py-5 border border-[var(--neutral-200)]"
            role="menu"
            variants={viewVariants(-50)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {searchHistory &&
              searchHistory.map((item) => {
                const isCurrent = item.ip === ipState.ip;

                return (
                  <li
                    key={item.ip}
                    role="menuitem"
                    className={`w-full flex items-center justify-between gap-4 text-[var(--neutral-900)] border p-2 rounded-lg ${
                      isCurrent
                        ? "border-[var(--primary-color)] bg-[#7a9af1]/10"
                        : "border-black/20 bg-black/5"
                    }`}
                  >
                    <span className="text-sm flex flex-col items-start font-normal sm:gap-1 sm:min-w-max">
                      <span>
                        <strong>Location: </strong>
                        {item?.region}, {item?.country}.
                      </span>
                      <span>
                        <strong>IP Address: </strong> {item?.ip}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStateUpdate(item)}
                        className="font-medium border border-transparent sm:h-10 sm:bg-[var(--primary-color)] sm:px-3.5 sm:rounded-lg sm:text-white hover:border-[var(--primary-color)] hover:bg-inherit hover:text-[var(--neutral-900)]"
                      >
                        <span className="sr-only">Apply IP {item.ip}</span>
                        <span className="sm:hidden text-[var(--primary-color)]">
                          <CheckCircle fontSize="medium" />
                        </span>
                        <span className="hidden sm:flex">Apply</span>
                      </button>
                      <button
                        type="button"
                        disabled={canDelete}
                        onClick={() => toggleDialog(item.ip)}
                        className="disabled:cursor-not-allowed sm:disabled:bg-[var(--neutral-300)] border border-transparent sm:hover:border sm:bg-[var(--red-100)] sm:rounded-lg sm:text-[var(--black)] sm:h-10 sm:px-3.5 font-medium sm:hover:border-[var(--red-100)] sm:hover:bg-transparent"
                      >
                        <span className="sr-only">Remove IP {item.ip}</span>
                        <span
                          className={`sm:hidden ${
                            canDelete
                              ? "text-[var(--neutral-300)]"
                              : "text-[var(--red-300)]"
                          }`}
                        >
                          <CancelRounded fontSize="medium" />
                        </span>
                        <span className="hidden sm:flex text-white hover:text-[var(--neutral-900)]">
                          Remove
                        </span>
                      </button>
                    </span>
                  </li>
                );
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
