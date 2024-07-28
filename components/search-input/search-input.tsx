import * as React from "react";
import { Song } from "@/types/song";

import styles from "./search-input.module.css";
import Link from "next/link";

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

  const handleSuggestionClick = () => {
    setSuggestions([]);
    setQuery("");
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
          {suggestions.map((suggestion, index) => {
            const isLastItem = index === suggestions.length - 1;
            const onlyOneItem = suggestions.length === 1;
            return (
              <Link
                href={`/song/${suggestion.id}`}
                onClick={handleSuggestionClick}
              >
                <li key={suggestion.id}>
                  {suggestion.song.title}
                  {!onlyOneItem && !isLastItem ? (
                    <hr className={styles.separator} />
                  ) : null}
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
