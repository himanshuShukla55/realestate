import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { Home, About, SignIn, SignUp, Profile } from "./pages";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

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
        <Route
          path="/create-listing"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          }
        />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
