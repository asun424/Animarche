import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemsContainer from "./search/ItemsContainer";
import axios from "axios";

const SearchPage = () => {
  const [results, setResults] = useState(null);
  const location = useLocation();
  const query = location.search.slice(9);

  useEffect(() => {
    const getResults = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/scrape?keyword=${query}`
      );
      setResults(data);
    };
    getResults();
  }, []);

  return (
    <div>
      {!results
        ? "Loading..."
        : results.length === 0
        ? "No results found. Try Again!"
        : <ItemsContainer results={results}/>
      }
    </div>
  );
};

export default SearchPage;
