import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask': 'suggestions.placePrediction.text.text'
          },
          body: JSON.stringify({ input: value })
        });
        const data = await response.json();
        setSuggestions(data.suggestions ? data.suggestions.map(s => s.placePrediction.text.text) : []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address);
    setSuggestions([]);
    onSearch(address);
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <input
        value={value}
        onChange={handleInput}
        placeholder="Search for a location"
        className="w-full p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-300 text-sm"
      />
      {suggestions.length > 0 && (
        <div className="absolute w-full bg-black/50 backdrop-blur-lg rounded-lg mt-1 border border-white/20 max-h-40 overflow-y-auto">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="p-2 hover:bg-white/20 cursor-pointer text-white text-sm"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
