import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import debounce from "lodash.debounce";
import CourseCard from "../components/CourseCard";
import UserContext from "../UserContext";
import "../App";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function UserView() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { user } = useContext(UserContext);

  const fetchCourses = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/active`)
      .then((res) => res.json())
      .then((data) => {
        if (data.activeCourses.length > 0) {
          setCourses(data.activeCourses);
        } else {
          console.log("No course found");
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedSearch = useMemo(
    () =>
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
                setCourses(data);
              } else {
                console.log("No courses found with that name");
              }
            })
            .catch((error) => {
              console.error("Error searching courses:", error);
            });
        }
      }, 300),
    [fetchCourses]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  const debouncedPriceFilter = useMemo(
    () =>
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
                setCourses(data);
              } else {
                console.log("No courses found within the price range");
              }
            })
            .catch((error) => {
              console.error("Error filtering courses by price:", error);
            });
        }
      }, 300),
    [fetchCourses]
  );

  useEffect(() => {
    debouncedPriceFilter(minPrice, maxPrice);
    return () => {
      debouncedPriceFilter.cancel();
    };
  }, [minPrice, maxPrice, debouncedPriceFilter]);

  return (
    <>
      <form className="d-flex justify-content-flex-end mb-3 mt-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a course"
        />
        <HiMagnifyingGlass
          style={{ margin: "5px", cursor: "pointer" }}
          size={24}
          onClick={() => debouncedSearch(searchTerm)}
        />
      </form>
      <form className="d-flex justify-content-flex-end">
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
      <div className="card-grid">
        {courses.map((course) => (
          <CourseCard key={course._id} courseProp={course} />
        ))}
      </div>
    </>
  );
}
