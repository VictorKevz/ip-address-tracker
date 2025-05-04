import { AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/header/Header";
import { MapCard } from "./components/MapCard";
import { SearchProvider } from "./context/IpSearchContext";
import {
  SearchHistoryProvider,
  useSearchHistory,
} from "./context/SearchHistoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import WarningDialog from "./components/WarningDialog";

function App() {
  return (
    <ThemeProvider>
      <SearchHistoryProvider>
        <SearchProvider>
          <main className="w-full min-h-screen bg-[var(--main-bg)] flex flex-col items-center justify-start gap-4 relative">
            <Header />
            <MapCard />
          </main>
          <DialogWrapper />
        </SearchProvider>
      </SearchHistoryProvider>
    </ThemeProvider>
  );
}

export default App;

function DialogWrapper() {
  const { showDialog, currentIp } = useSearchHistory();
  return (
    <AnimatePresence mode="wait">
      {showDialog && <WarningDialog key={currentIp} />}
    </AnimatePresence>
  );
}
