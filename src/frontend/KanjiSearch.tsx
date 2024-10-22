import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "./LightDarkMode";

const KanjiSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search term
  const [kanjiResults, setKanjiResults] = useState<string[]>([]); // State for kanji results
  const [radicalResults, setRadicalResults] = useState<string[]>([]); // State for radical results
  const [hasSearched, setHasSearched] = useState<boolean>(false); // State to track if a search has been performed
  const { darkMode } = useTheme();

  // Memoized function to handle search logic
  const performSearch = useCallback(async () => {
    const word = searchTerm.trim();
    if (!word) {
      alert("Enter a word to search for.");
      return;
    }

    setHasSearched(true); // Set the search flag to true after initiating a search

    const url = `https://kanjialive-api.p.rapidapi.com/api/public/search/${encodeURIComponent(
      word
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "15ae912ac0mshafc017a046e3bb5p1e71e3jsn9cd9b768b7e9",
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const resultData = await response.json();

      if (Array.isArray(resultData) && resultData.length > 0) {
        const kanjiArray: string[] = [];
        const radicalArray: string[] = [];

        resultData.forEach((kanjiData) => {
          if (kanjiData.kanji && kanjiData.kanji.character) {
            kanjiArray.push(kanjiData.kanji.character); // Add kanji to the array
          }

          if (kanjiData.radical && kanjiData.radical.character) {
            radicalArray.push(kanjiData.radical.character); // Add radical to the array
          }
        });

        setKanjiResults(kanjiArray); // Update the kanji results state
        setRadicalResults(radicalArray); // Update the radical results state
      } else {
        setKanjiResults([]); // Clear results if no data found
        setRadicalResults([]);
      }
    } catch (error) {
      console.error(error);
      setKanjiResults([]); // Clear results on error
      setRadicalResults([]);
    }
  }, [searchTerm]); // Depend on searchTerm to ensure it uses the latest value

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        performSearch(); // Call search function on Enter key press
      }
    };

    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [performSearch]); // Include performSearch in the dependencies

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Enter English word"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
        />
        <button onClick={performSearch}>Search</button>{" "}
      </div>
      {hasSearched && (
        <>
          <h2>Search results</h2>
          <div className="result">
            <div className="result-title">Kanji</div>
            <div className="grid-container">
              {kanjiResults.length > 0 ? (
                kanjiResults.map((kanji, index) => (
                  <div
                    className={darkMode ? "grid-item-clickable dark-mode" : "grid-item-clickable"}
                    key={index}
                    onClick={() => (window.location.href = `/kanji/${kanji}`)} // Navigate to details page on click
                  >
                    {kanji}
                  </div>
                ))
              ) : (
                <div>No kanji found.</div>
              )}
            </div>
          </div>
          <div className="result">
            <div className="result-title">Radical</div>
            <div className="grid-container">
              {radicalResults.length > 0 ? (
                radicalResults.map((radical, index) => (
                  <div
                    className={darkMode ? "grid-item dark-mode" : "grid-item"}
                    key={index}
                  >
                    {radical}
                  </div>
                ))
              ) : (
                <div>No radicals found.</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default KanjiSearch;
