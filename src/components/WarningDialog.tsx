import { Close, DeleteForever } from "@mui/icons-material";
import FocusTrap from "@mui/material/Unstable_TrapFocus";
import { motion } from "framer-motion";
import { viewVariants } from "../variants";
import { useSearchHistory } from "../context/SearchHistoryContext";

const WarningDialog = () => {
  const { onDelete, toggleDialog, currentIp } = useSearchHistory();

  //   if (!showModal) return null;
  return (
    <FocusTrap open>
      <div className="z-500 w-full min-h-screen fixed top-0 left-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] transition-all duration-300 ease-in-out px-4">
        <motion.dialog
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          tabIndex={-1}
          variants={viewVariants(30)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-lg w-full flex flex-col justify-between bg-[var(--neutral-0)] py-5 rounded-xl shadow-xl border border-[var(--neutral-200)] relative m-0"
        >
          <header className="flex items-start gap-3 w-full px-5 mt-8 sm:mt-6">
            <span className="min-w-12 min-h-12 bg-[var(--secondary-color)] rounded-lg flex items-center justify-center text-[var(--white)]">
              <DeleteForever aria-hidden="true" fontSize="large" />
            </span>
            <div className="flex flex-col gap-1">
              <h3
                id="modal-title"
                className="text-xl sm:text-2xl text-[var(--neutral-900)] font-bold"
              >
                Confirm deletion!
              </h3>
              <p
                id="modal-description"
                className="text-[var(--neutral-300)] text-xs sm:text-base"
              >
                Are you sure you want to delete IP Address:
                <strong>{currentIp}</strong>? This action can't be undone!
              </p>
            </div>
          </header>
          <footer className="w-full flex justify-end items-center mt-6 pt-3.5 px-5 gap-3 border-t border-[var(--neutral-300)]">
            <button
              type="button"
              className="h-10 px-4 text-[var(--neutral-900)] rounded-lg border border-[var(--secondary-color)] font-medium hover:bg-[var(--secondary-color)] hover:text-[var(--white)]"
              onClick={() => toggleDialog(currentIp)}
              aria-label="Cancel deletion"
              autoFocus
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onDelete(currentIp)}
              aria-label={`Confirm deletion of ${currentIp}`}
              className="h-10 px-4 rounded-lg bg-[var(--red-100)] text-[var(--black)] font-medium border border-transparent hover:border-[var(--red-100)] hover:bg-inherit hover:text-[var(--neutral-900)]"
            >
              Delete
            </button>
          </footer>
          <button
            type="button"
            onClick={() => toggleDialog(currentIp)}
            aria-label="Close dialog"
            className="absolute right-4 top-4 w-8 h-8 rounded-lg border border-[var(--neutral-200)] text-[var(--neutral-900)] hover:bg-[var(--neutral-200)]"
          >
            <Close fontSize="medium" aria-hidden="true" />
          </button>
        </motion.dialog>
      </div>
    </FocusTrap>
  );
};

export default WarningDialog;
