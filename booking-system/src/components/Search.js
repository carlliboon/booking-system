import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

export default function Search({ onSearchResults, fetchCourses }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term === "") {
        fetchCourses();
      } else {
        fetch(`${process.env.REACT_APP_API_URL}/courses/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseName: term }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              onSearchResults(data);
            } else {
              console.log("No courses found with that name");
            }
          })
          .catch((error) => {
            console.error("Error searching courses:", error);
          });
      }
    }, 300),
    [fetchCourses, onSearchResults]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  return (
    <form>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a course"
      />
      <button type="button" onClick={() => debouncedSearch(searchTerm)}>
        Search
      </button>
    </form>
  );
}
