import "./App.css";
import Header from "./components/header/Header";
import { MapCard } from "./components/MapCard";
import { SearchProvider } from "./context/IpSearchContext";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <SearchHistoryProvider>
        <SearchProvider>
          <main className="w-full min-h-screen bg-[var(--main-bg)] flex flex-col items-center justify-stretch gap-4 relative">
            <Header />
            <MapCard />
          </main>
        </SearchProvider>
      </SearchHistoryProvider>
    </ThemeProvider>
  );
}

export default App;
