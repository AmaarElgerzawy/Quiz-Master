import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./App/common/private_route";
import AuthenticatedRoute from "./App/common/auth_route";
import { loadUser } from "./App/actions/auth";
import Loader from "./App/layouts/loading";

// Layouts
import MyHeader from "./App/layouts/MyHeader";

// Pages
import StartPage from "./App/pages/start";
import SignInPage from "./App/pages/sign_in";
import SignUpPage from "./App/pages/sign_up";
import StatisticsPage from "./App/pages/statics";
import CreateQuizPage from "./App/pages/create_quiz";
import ProfilePage from "./App/pages/profile";
import SettingsPage from "./App/pages/settings";
import QuizPage from "./App/pages/show_quizes";
import Dashboard from "./App/pages/dashboard";
import Quiz from "./App/pages/take_quiz";
import CreateGroup from "./App/pages/create_group";
import GroupsList from "./App/pages/list_groups";
import StudentList from "./App/pages/list_students";
import JoinGroup from "./App/pages/join_group";
import PublishNews from "./App/pages/publish_news";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Optional CSS

// CSS Files
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const inQuiz = useSelector((state) => state.auth.inQuiz);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(loadUser()); // Dispatch loadUser only once when app mounts
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <Loader message="Loading user data..." />;
  }

  return (
    <div>
      <Router>
        <ToastContainer />
        <MyHeader />
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<StartPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statics" element={<StatisticsPage />} />
            <Route path="/createquiz" element={<CreateQuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/takequiz" element={<Quiz />} />
            <Route path="/quizes" element={<QuizPage />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/listgroup" element={<GroupsList />} />
            <Route path="/studentlist/:pk/" element={<StudentList />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/publishnews" element={<PublishNews />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
