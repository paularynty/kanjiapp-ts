import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KanjiDetails from "./frontend/KanjiDetails";
import KanjiList from "./frontend/KanjiList";
import KanjiSearch from "./frontend/KanjiSearch";
import { useTheme } from "./frontend/LightDarkMode";
import "./App.css";

interface UseThemeReturnType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme() as UseThemeReturnType;

  return (
    <Router>
      <div className={darkMode ? "App dark-mode" : "App light-mode"}>
        <header className={darkMode ? "header dark-mode" : "header"}>
          <div className="link">Welcome to KanjiDex!</div>
          <div className="header-content-right">
            <Link className="link" to="/home">
              Home
            </Link>
            <Link className="link" to="/search">
              Search
            </Link>
            <Link className="link" to="/allkanji">
              All Kanji
            </Link>
            <Link className="link" to="/login">
              Log In
            </Link>
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/allkanji" element={<KanjiList />} />
          <Route path="/search" element={<KanjiSearch />} />
          <Route path="/kanji/:character" element={<KanjiDetails />} />
        </Routes>
        <div className="button">
          <button onClick={toggleDarkMode}>
            {darkMode ? "Switch to light mode" : "Switch to dark mode"}
          </button>
        </div>
      </div>
    </Router>
  );
};

export default App;
