import { CardGroup } from "react-bootstrap";
import PreviewCourses from "./PreviewCourses";
import { useState, useEffect } from "react";

export default function FeaturedCourses() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", data);

        if (data.courses && data.courses.length > 0) {
          const numbers = [];
          const featured = [];

          const generateRandomNums = () => {
            if (numbers.length < 5) {
              let randomNum = Math.floor(Math.random() * data.courses.length);
              console.log(randomNum);

              if (numbers.indexOf(randomNum) === -1) {
                numbers.push(randomNum);
                generateRandomNums();
              }
            }
          };

          generateRandomNums();

          numbers.forEach((num) => {
            featured.push(
              <PreviewCourses
                data={data.courses[num]}
                key={data.courses[num]._id}
                breakPoint={2}
              />
            );
          });

          setPreviews(featured);
        }
      });
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Courses</h2>
      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
