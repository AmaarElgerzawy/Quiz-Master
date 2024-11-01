import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import './css/ToastStyles.css'; // Import your custom styles

// REDUX
import { register } from "../actions/auth";

// UI
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// CSS
import "./CSS/sign_up.css";

function SignUpPage() {
  // Define form state
  const [state, setState] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    gender: "", // Add gender to state
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value, // Update the corresponding field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, location, gender, password, password2 } =
      state;

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const newUser = {
        username,
        email,
        phone,
        location,
        gender, // Include gender in the newUser object
        password,
      };
      dispatch(register(newUser))
        .then(() => navigate("/dashboard"))
        .catch((err) => toast.error(err)); // Make sure the register function is correctly implemented
    }
  };

  return (
    <Container
      fluid
      className="sign-up-page d-flex justify-content-center align-items-center">
      <Row className="w-100 mt-5">
        <Col lg={6} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Create an Account</h2>
              <Form onSubmit={handleSubmit}>
                {/* Name Input */}
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    value={state.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email Input */}
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Phone and Location Inputs Side by Side */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formBasicPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={state.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        name="location"
                        value={state.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Gender Input */}
                <Form.Group controlId="formBasicGender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={state.gender}
                    onChange={handleChange}
                    required>
                    <option value="">Select your gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicPassword2" className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={state.password2}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
