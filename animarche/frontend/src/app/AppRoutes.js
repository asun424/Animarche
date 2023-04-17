import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import { Routes, Route } from "react-router-dom";
import NavBar from "../features/NavBar";
import LandingPage from "../features/LandingPage";
import SearchPage from "../features/SearchPage";
import QuizPage from "../features/QuizPage";
import SavedItemsPage from "../features/SavedItemsPage";
import SignUpLoginPage from "../features/auth/SignupLoginPage";
import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/savedItems" element={<SavedItemsPage />} />
          <Route path="/signup" element={<SignUpLoginPage />}></Route>
          <Route path="/login" element={<SignUpLoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default AppRoutes;
