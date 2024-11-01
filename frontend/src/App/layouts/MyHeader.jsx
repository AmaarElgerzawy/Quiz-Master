import React, { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { TEACHER } from "../actions/types";
import { toast } from "react-toastify";

import "./CSS/MyHeader.css";

function MyHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to check user authentication and user details
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleOnClick = () => {
    dispatch(logout())
      .then(() => navigate("/"))
      .catch((err) => toast.error(err));
  };

  return (
    <Navbar
      expand="lg"
      className="bg-primary-dark"
      style={{ padding: "10px 50px", fontSize: "16px" }}>
      <Container
        fluid
        className="d-flex justify-content-between align-items-center">
        {/* Left Section: Navbar Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontSize: "24px", fontWeight: "bolder" }}>
          Quiz Master
        </Navbar.Brand>

        {/* Conditional Rendering based on authentication */}
        {isAuthenticated ? (
          <>
            {user.groups.includes(TEACHER) ? (
              <Nav>
                <Nav.Link as={Link} to="/listgroup">
                  My Groups
                </Nav.Link>
                <Nav.Link as={Link} to="/createquiz">
                  Create Quiz
                </Nav.Link>
                <Nav.Link as={Link} to="/creategroup">
                  Create Group
                </Nav.Link>
                <Nav.Link as={Link} to="/publishnews">
                  Publish News
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/statics">
                  Statics
                </Nav.Link>
                <Nav.Link as={Link} to="/quizes">
                  Quizs
                </Nav.Link>
                <Nav.Link as={Link} to="/joingroup">
                  Join Group
                </Nav.Link>
              </Nav>
            )}
              <NavDropdown
                title={user ? user.username : "User"}
                id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleOnClick}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
          </>
        ) : (
          <div>
            <Button variant="success" className="m-1" as={Link} to="/signin">
              Login
            </Button>
            <Button variant="light" className="m-1" as={Link} to="/register">
              Sign Up
            </Button>
          </div>
        )}

      </Container>
    </Navbar>
  );
}

export default MyHeader;
