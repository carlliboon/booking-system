import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import EditCourse from "./EditCourse";

export default function AdminView() {
  const [courses, setCourses] = useState([]);

  // Assigning all courses available in the database to the courses variable
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
      });
  }, []);

  const updateCourseStatus = (updatedCourse) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-4">Admin Dashboard</h1>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <EditCourse
              key={course._id}
              course={course}
              updateCourseStatus={updateCourseStatus}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
