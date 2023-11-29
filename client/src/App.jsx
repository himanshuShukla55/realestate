import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Home, About, SignIn, SignUp, Profile } from "./pages";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
