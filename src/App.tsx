import "./App.css";
import Header from "./components/header/Header";
import LocationResults from "./components/LocationResults";
import { MapCard } from "./components/MapCard";
import { SearchProvider } from "./context/IpSearchContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <main className="w-full min-h-screen bg-[var(--main-bg)] flex flex-col items-center justify-stretch gap-4 relative">
          <Header />
          <LocationResults />
          <MapCard />
        </main>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
