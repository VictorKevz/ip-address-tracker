import { AnimatePresence, motion } from "framer-motion";
import { alertVariants } from "../variants";
import { useSearchHistory } from "../context/SearchHistoryContext";
import { Alert } from "@mui/material";

export const AlertMessage = () => {
  const { showAlert } = useSearchHistory();
  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          className="max-w-[20rem] w-full shadow-2xl z-500"
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Alert variant="filled" severity="success">
            Deleted Successfully!
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
