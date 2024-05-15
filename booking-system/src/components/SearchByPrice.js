import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";

export default function SearchByPrice({ onFilterResults, fetchCourses }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const debouncedPriceFilter = useCallback(
    debounce((min, max) => {
      if (min === "" && max === "") {
        fetchCourses();
      } else {
        fetch(`${process.env.REACT_APP_API_URL}/courses/priceRange`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minPrice: Number(min) || 0,
            maxPrice: Number(max) || Infinity,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              onFilterResults(data);
            } else {
              console.log("No courses found within the price range");
            }
          })
          .catch((error) => {
            console.error("Error filtering courses by price:", error);
          });
      }
    }, 300),
    [fetchCourses, onFilterResults]
  );

  useEffect(() => {
    debouncedPriceFilter(minPrice, maxPrice);
    return () => {
      debouncedPriceFilter.cancel();
    };
  }, [minPrice, maxPrice, debouncedPriceFilter]);

  return (
    <form>
      <input
        type="number"
        name="minPrice"
        value={minPrice}
        onChange={handlePriceChange}
        placeholder="Min price"
      />
      <input
        type="number"
        name="maxPrice"
        value={maxPrice}
        onChange={handlePriceChange}
        placeholder="Max price"
      />
      <button
        type="button"
        onClick={() => debouncedPriceFilter(minPrice, maxPrice)}
      >
        Filter by Price
      </button>
    </form>
  );
}
