import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home-page/home-page";
import { Navbar } from "./components/navbar/navbar";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
