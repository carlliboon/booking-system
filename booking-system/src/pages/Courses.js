import React, { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function Courses({ courses }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchUserDetails() {
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
          console.log(data.user);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        alert("An error occurred while fetching the user details.");
      }
    }

    fetchUserDetails();
  }, [user.token]);

  return (
    <>
      {user.isAdmin ? <AdminView /> : <UserView />}
      {courses}
    </>
  );
}
