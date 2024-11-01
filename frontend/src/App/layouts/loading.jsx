import React from "react";
import { Spinner } from "react-bootstrap";
import "./CSS/loading.css"; // Import custom styles if needed

function Loader({ message = "Loading, please wait..." }) {
  return (
    <div className="loader-container d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" role="status" className="mb-3">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="loader-message">{message}</div>
    </div>
  );
}

export default Loader;
