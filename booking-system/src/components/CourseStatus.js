import { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CourseStatus({
  course,
  onAvailable,
  updateCourseStatus,
}) {
  const [isActive, setIsActive] = useState(course.isActive);

  const toggleCourseStatus = () => {
    const newStatus = !isActive;
    fetch(
      `${process.env.REACT_APP_API_URL}/courses/${course._id}/${
        newStatus ? "activate" : "archive"
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: newStatus ? "Activated!" : "Archived!",
          text: newStatus
            ? `${course.name} has been activated`
            : `${course.name} has been archived`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setIsActive(newStatus);
        onAvailable(newStatus ? "Available" : "Archived");
        updateCourseStatus({ ...course, isActive: newStatus });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to update the course status",
          icon: "error",
        });
      });
  };

  return (
    <Button
      variant={isActive ? "secondary" : "success"}
      size="sm"
      onClick={toggleCourseStatus}
    >
      {isActive ? "Archive" : "Activate"}
    </Button>
  );
}
