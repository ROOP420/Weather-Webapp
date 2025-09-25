import React from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';

const SearchBar = ({ onSearch }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
    clearSuggestions();
    onSearch(address);
  };

  return (
    <div className="relative z-10">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search for a location"
        className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300"
      />
      {status === 'OK' && (
        <div className="absolute w-full bg-black/50 backdrop-blur-lg rounded-lg mt-1 border border-white/20">
          <ul>
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="p-2 hover:bg-white/20 cursor-pointer text-white"
              >
                {description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
