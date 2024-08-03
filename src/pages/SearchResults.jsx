import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h2>{result.title || result.username || result.name}</h2>
              <p>{result.description || result.role || result.position}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;
