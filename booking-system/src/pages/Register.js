import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Register() {
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(mobileNo);
  console.log(password);
  console.log(confirmPassword);

  function registerUser(e) {
    e.preventDefault();

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Registered Successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          // setUser({
          //   access: localStorage.getItem("token"),
          // });

          alert("Registration Successful");
        } else if (data.error === "Email invalid") {
          alert("Email is invalid");
        } else if (data.error === "Mobile number is invalid") {
          alert("Mobile number is invalid");
        } else if (data.error === "Password must be atleast 8 characters") {
          alert("Password must be atleast 8 characters");
        } else {
          alert("Something went wrong.");
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return (
    <Form
      onSubmit={(e) => registerUser(e)}
      className="centered-form centered-form-register"
    >
      <h1 className="my-5 text-center">Create new account</h1>

      <Form.Group className="form-fields">
        <Form.Control
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="text"
          placeholder="(11 Digit) Mobile #"
          required
          value={mobileNo}
          onChange={(e) => {
            setMobileNo(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="form-fields">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>

      {isActive ? (
        <Button
          variant="primary"
          type="submit"
          id="submitBtn"
          className="d-flex ms-auto"
        >
          Register
        </Button>
      ) : (
        <Button
          variant="danger"
          type="submit"
          id="submitBtn"
          className="d-flex ms-auto"
          disabled
        >
          Register
        </Button>
      )}
    </Form>
  );
}
