import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { login } from "../actions/auth";
import { toast } from "react-toastify";
import "./css/ToastStyles.css"; // Import your custom styles

import "./CSS/sign_in.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create user object with email and password from form inputs
    const user = { email, password };

    // Dispatch login action with user data
    dispatch(login(user))
      .then(() => {
        if (error) {
          toast.error(error);
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Container
      fluid
      className="sign-in-page d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Sign In</h2>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    className="py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    className="py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    onClick={handleOnSubmit}
                    variant="primary"
                    type="submit"
                    className="fw-bold py-2">
                    Sign In
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <a href="#forgot-password" className="text-muted">
                    Forgot your password?
                  </a>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
