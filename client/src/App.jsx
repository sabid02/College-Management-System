import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/homePage/Home";
import AdminSignIn from "./pages/admin/SignIn"; // Admin Sign In
import TeacherSignIn from "./pages/teacher/TeacherSignIn"; // Teacher Sign In
import StudentSignIn from "./pages/student/StudentSignIn"; // Student Sign In
import SignUp from "./pages/admin/SignUp"; // Admin Sign Up
import TeacherSignUp from "./pages/teacher/TeacherSignUp"; // Teacher Sign Up
import StudentSignUp from "./pages/student/StudentSignUp"; // Student Sign Up

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/signin" element={<TeacherSignIn />} />
          <Route path="/teacher/signup" element={<TeacherSignUp />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/admin/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
