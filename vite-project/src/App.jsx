import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Home from "./Home/Home";
import ForgotPasswordFlow from "./Authentication/ForgotPasswordFlow";
import Booking from "./Booking/Booking";
import BookSummary from "./Booking/BookSummary";
import BookAppointment from "./Booking/BookAppointment";

import Dashboard from "./Admin/Dashboard";
import AdminBooking from "./Admin/Booking";
import ProductsAndServices from "./Admin/ProductsAndServices";
import Reminders from "./Admin/Reminders";
import Calendars from "./Admin/Calendars";
import Suppliers from "./Admin/Suppliers";
import UserClients from "./Admin/UserClients";
import BackgroundGallery from "./Admin/BackgroundGallery";
import Policy from "./Home/Policy";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-summary" element={<BookSummary />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/policy" element={<Policy />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/booking" element={<AdminBooking />} />
        <Route path="/admin/products-services" element={<ProductsAndServices />} />
        <Route path="/admin/reminders" element={<Reminders />} />
        <Route path="/admin/calendars" element={<Calendars />} />
        <Route path="/admin/suppliers" element={<Suppliers />} />
        <Route path="/admin/user-clients" element={<UserClients />} />
        <Route path="/admin/background-gallery" element={<BackgroundGallery />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
