import React from "react";

const SuggestionsList = ({ suggestions }) => {
  if (!suggestions.length) return null;

  return (
    <ul className="suggestions-list">
      {suggestions.map((item, index) => (
        <li key={index}>
          <a
            href={`https://en.wikipedia.org/wiki/${item}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
