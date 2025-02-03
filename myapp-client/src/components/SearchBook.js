import axios from 'axios';
import React, { useState } from 'react';
import './SearchBook.css';

const SearchBook = () => {
  const [showSearchAlert, setShowSearchAlert] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/getsearch_collection?book_name=${searchTerm}`);
      setSearchResults(response.data.data);
      setShowSearchAlert(true);
    } catch (error) {
      console.error('Error searching for books:', error);
      setShowSearchAlert(false);
    }
    setSearchTerm('');
  };

  return (
    <div className="search-book">
      <input 
        type="text" 
        placeholder="Search for a book" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button onClick={handleSearch}>Search</button>

      {showSearchAlert && (
        <div className="search-alert">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((itm, index) => (
                <li key={index}>{itm.book_name}</li>
              ))}
            </ul>
          ) : (
            <p>No results found for "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBook;
