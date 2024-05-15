import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ newPassword: newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Password reset successfully") {
          Swal.fire({
            title: "Password Reset Successful",
            icon: "success",
            text: "Your password has been reset successfully.",
            showConfirmButton: true,
          }).then(() => {
            navigate("/login");
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.message || "Unable to reset password. Please try again.",
          });
        }
      });

    setNewPassword("");
  };

  return (
    <Form onSubmit={handleReset} className="centered-form centered-form-login">
      <h1 className="mb-5 text-center">Reset Password</h1>
      <Form.Group controlId="newPassword" className="form-fields">
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="d-flex ms-auto">
        Reset Password
      </Button>
    </Form>
  );
}
