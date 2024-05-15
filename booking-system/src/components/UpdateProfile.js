import React, { useState } from "react";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            mobileNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error updating profile");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || "Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Mobile Number:
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdateProfile}>Update Profile</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
