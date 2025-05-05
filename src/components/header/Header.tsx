import darkMobileBg from "../../assets/images/bg-dark-mobile.svg";
import darkDesktopBg from "../../assets/images/bg-dark-desktop.svg";

import lightMobileBg from "../../assets/images/bg-light-mobile.svg";
import lightDesktopBg from "../../assets/images/bg-light-desktop.svg";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SearchBar from "../SearchBar";
import ToggleButton from "./ToggleButton";
import { SearchHistory } from "./SearchHistory";
import LocationResults from "../LocationResults";

const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const bgObj = {
    mobile: {
      dark: darkMobileBg,
      light: lightMobileBg,
    },
    desktop: {
      dark: darkDesktopBg,
      light: lightDesktopBg,
    },
  };

  const bgImg =
    bgObj[isMobile ? "mobile" : "desktop"][isDark ? "dark" : "light"];
  return (
    <header
      className="w-full min-h-74 bg-center bg-cover bg-no-repeat flex flex-col items-center py-8 px-6 relative z-50"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <ToggleButton />
      <h1 className="text-3xl text-shadow sm:text-4xl font-medium mt-8 text-white/90">
        IP Adress Tracker
      </h1>
      <div className="max-w-screen-lg w-full flex flex-col sm:flex-row items-start justify-between gap-4 mt-8">
        <SearchBar />
        <SearchHistory />
      </div>
      <LocationResults />

      <div className="absolute top-0 left-0 right-0 bottom-0 w-full bg-black/15 backdrop-blur-[8px] z-[-1]"></div>
    </header>
  );
};

export default Header;
