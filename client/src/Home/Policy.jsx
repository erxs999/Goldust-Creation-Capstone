import React from "react";
import TopBar from "./TopBar";
import "./home.css";

const Policy = () => {
  return (
    <>
      <TopBar />
      <div className="policy-container">
        <h1>Our Policy</h1>
        <p>
          Welcome to Goldust Creation! Please review our policies below:
        </p>
        <ul>
          <li>All appointments must be booked in advance.</li>
          <li>Cancellations require 24-hour notice.</li>
          <li>Late arrivals may result in shortened service time.</li>
          <li>Respectful behavior is expected at all times.</li>
          <li>For more details, contact our support team.</li>
        </ul>
      </div>
    </>
  );
};

export default Policy;
