import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import { useState } from "react";
import AppNavbar from "../src/components/AppNavBar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import "./App.css";
import { UserProvider } from "./UserContext";
import { Container } from "react-bootstrap";
import CourseView from "./pages/CourseView";
import AddCourse from "./pages/AddCourse";
import ResetPassword from "./components/ResetPasssword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  // useEffect(() => {
  //   console.log(user);
  //   console.log(localStorage);
  // }, [user]);

  const unsetUser = () => {
    localStorage.clear();
    setUser({ id: null, isAdmin: null }); // Reset the user state
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseView />} />
            <Route
              path="/courses/addCourse"
              element={
                <AdminRoute>
                  <AddCourse />
                </AdminRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
