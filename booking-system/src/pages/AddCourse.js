import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function AddCourse() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");

  function addNewCourse(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/courses/addCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: Number(price), // Ensure price is sent as a number
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data", data);
        if (data.savedCourse) {
          // Course was saved successfully
          setName("");
          setDescription("");
          setPrice(0); // Resetting price to 0 instead of empty string for type consistency
          setMessage(data.message || "Course added successfully!");
          setAlertVariant("success");
        } else {
          setMessage(data.message || "Something went wrong.");
          setAlertVariant("danger");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to connect to the server.");
        setAlertVariant("danger");
      });
  }

  return (
    <Form
      onSubmit={addNewCourse}
      className="centered-form centered-form-register"
    >
      <h1 className="my-5 text-center">Add Course</h1>

      {message && <Alert variant={alertVariant}>{message}</Alert>}

      <Form.Group className="form-fields">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="textarea"
          as="textarea"
          placeholder="Enter Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="number" 
          placeholder="Enter Price"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" id="submitBtn">
        Submit
      </Button>
    </Form>
  );
}
