import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/users/details", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.user) {
          setProfile(data.user);
        } else {
          alert(data.error || "Failed to fetch user details.");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        alert("An error occurred while fetching the user details.");
      }
    };

    fetchUserDetails();
  }, [user.token]);

  console.log("Profile", profile);
  console.log("User", user);

  if (profile === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div>
        <h3>
          <u>
            {profile.firstName && profile.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : "No name provided"}
          </u>
        </h3>
      </div>
      <h5>Contacts</h5>
      <ul>
        <li>
          <strong>Email:</strong> {profile.email || "No email provided"}
        </li>
        <li>
          <strong>Mobile No:</strong> {profile.mobileNo || "No phone provided"}
        </li>

        <Link to="/reset-password" className="mt-3">
          <Button variant="link" className="d-flex ms-auto">
            Reset Password
          </Button>
        </Link>
        <Link to="/update-profile" className="mt-3">
          <Button variant="link" className="d-flex ms-auto">
            Update Profile
          </Button>
        </Link>
      </ul>
    </div>
  );
}
