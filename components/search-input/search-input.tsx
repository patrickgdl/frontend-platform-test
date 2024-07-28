import * as React from "react";
import { Song } from "@/types/song";

import styles from "./search-input.module.css";

const SearchInput = ({ songs }: { songs: Song[] }) => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Song[]>([]);

  const handleInputChange = (value: string) => {
    setQuery(value);

    if (value) {
      const filteredSuggestions = songs.filter((song) =>
        song.song.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setSuggestions([]);
    setQuery(value);
  };

  return (
    <div className={styles.autocomplete} style={{ width: "300px" }}>
      <input
        type="search"
        value={query}
        className={styles.search}
        placeholder="Search in your library"
        onChange={(e) => handleInputChange(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className={styles.autocompleteItems}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.song.title)}
            >
              {suggestion.song.title}
              <hr className={styles.separator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
