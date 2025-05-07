import { DarkModeOutlined, LightMode } from "@mui/icons-material";
import { useTheme } from "../../context/ThemeContext";

const ToggleButton = () => {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="absolute top-4 right-5 w-8 h-8 md:w-12 md:h-12 bg-[var(--neutral-50)] text-[var(--primary-color)] rounded-full shadow-lg hover:rotate-360 z-10 border border-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-[var(--white)]"
      onClick={toggleTheme}
      aria-label="Toggle dark and light mode"
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      {isDark ? <DarkModeOutlined /> : <LightMode />}
    </button>
  );
};

export default ToggleButton;
