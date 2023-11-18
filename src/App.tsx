import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home-page/home-page";
import { Navbar } from "./components/navbar/navbar";
import AuthProvider from "./contexts/AuthProvider";
import { LoginPage } from "./pages/login/login";
import { RegisterPage } from "./pages/register/register";
import { JobsListPage } from "./pages/jobs-list/jobs-list";
import { PostedJobsPage } from "./pages/posted-jobs/posted-jobs";

export const toastCss = {
  style: {
    fontFamily: "Roboto, sans-serif",
    marginTop: "4rem"
  }
}

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobsListPage />} />
            <Route path="/posted" element={<PostedJobsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
