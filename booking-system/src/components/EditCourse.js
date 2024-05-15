import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import CourseStatus from "./CourseStatus";
import { HiMiniPencilSquare, HiArrowDownTray } from "react-icons/hi2";

export default function EditCourse({ course, updateCourseStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({ ...course });

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditedCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API_URL}/courses/${course._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedCourse),
    })
      .then((response) => response.json())
      .then((data) => {
        updateCourseStatus(editedCourse); // Update the main list with new data
        setIsEditing(false);
        Swal.fire({
          title: "Updated!",
          text: `${course.name}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to update the course.", "error");
      });
  };

  const formatter = new Intl.NumberFormat("en-US");

  return (
    <tr>
      <td>{course._id}</td>
      <td>
        {isEditing ? (
          <Form.Control
            className="text-center"
            type="text"
            value={editedCourse.name}
            onChange={(e) => handleChange(e, "name")}
          />
        ) : (
          course.name
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Control
            className="text-center"
            type="text"
            value={editedCourse.description}
            onChange={(e) => handleChange(e, "description")}
          />
        ) : (
          course.description
        )}
      </td>
      <td>
        {isEditing ? (
          <Form.Control
            className="text-center"
            type="text"
            value={editedCourse.price}
            onChange={(e) => handleChange(e, "price")}
          />
        ) : (
          `₱ ${formatter.format(course.price)}`
        )}
      </td>
      <td className={`${course.isActive ? "text-success" : "text-danger"}`}>
        <strong>{course.isActive ? "Available" : "Unavailable"}</strong>
      </td>
      <td>
        {isEditing ? (
          <HiArrowDownTray onClick={handleSave} style={{ cursor: "pointer" }} />
        ) : (
          <HiMiniPencilSquare
            onClick={() => setIsEditing(true)}
            style={{ cursor: "pointer" }}
          />
        )}
      </td>
      <td>
        <CourseStatus
          course={course}
          onAvailable={(status) =>
            setEditedCourse((prev) => ({
              ...prev,
              isActive: status === "Available",
            }))
          }
          updateCourseStatus={updateCourseStatus}
        />
      </td>
    </tr>
  );
}
