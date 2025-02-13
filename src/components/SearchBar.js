import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SuggestionsList from "./SuggestionsList";

const WIKI_API_URL = process.env.REACT_APP_WIKI_API || "https://en.wikipedia.org/w/api.php";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (input) => {
    if (!input) return;

    setLoading(true);
    try {
      const response = await axios.get(WIKI_API_URL, {
        params: {
          action: "opensearch",
          search: input,
          limit: 8,
          namespace: 0,
          format: "json",
          origin: "*",
        },
      });

      setSuggestions(response.data[1]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    setLoading(false);
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  return (
    <div className="search-container" >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search Wikipedia..."
        className="search-input"
      />
      {loading && <p>Loading...</p>}
      <SuggestionsList suggestions={suggestions} />
    </div>
  );
};

export default SearchBar;
