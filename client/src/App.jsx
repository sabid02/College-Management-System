import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/homePage/Home";
import AdminSignIn from "./pages/admin/SignIn";
import TeacherSignIn from "./pages/teacher/TeacherSignIn";
import StudentSignIn from "./pages/student/StudentSignIn";
import SignUp from "./pages/admin/SignUp";
import TeacherSignUp from "./pages/teacher/TeacherSignUp";
import StudentSignUp from "./pages/student/StudentSignUp";
import TopicCreation from "./pages/teacher/TopicCreation";

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
          {/* Dynamic route for TeacherDashboard */}
          <Route path="/teacher/dashboard/:id" element={<TeacherDashboard />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/admin/signup" element={<SignUp />} />
          <Route path="/create/topic" element={<TopicCreation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
