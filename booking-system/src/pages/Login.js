// Login.js
import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import "../App";

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    // Prevents page redirection via form submission
    e.preventDefault();
    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          localStorage.setItem("token", data.access);

          // invoked the retrieveUserDetails function providing the token to be used to retrieve user details.
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to Course Booking",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again",
          });
        }
      });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch("http://localhost:4000/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/courses" />
  ) : (
    <Form
      onSubmit={(e) => authenticate(e)}
      className="centered-form centered-form-login"
    >
      <h1 className="mb-5 text-center">Zuitt Booking</h1>
      <Form.Group controlId="userEmail" className="form-fields">
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="form-fields">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {isActive ? (
        <Button
          variant="primary"
          type="submit"
          id="submitBtn"
          className="d-flex ms-auto"
        >
          Login
        </Button>
      ) : (
        <Button
          variant="danger"
          type="submit"
          id="submitBtn"
          className="d-flex ms-auto"
          disabled
        >
          Login
        </Button>
      )}
    </Form>
  );
}
