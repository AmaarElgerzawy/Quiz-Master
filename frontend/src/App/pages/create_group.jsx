import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import './css/ToastStyles.css'; // Import your custom styles
// REDUX
import { create_group } from "../actions/groups";

// UI
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// CSS
import "./CSS/sign_up.css";

function CreateGroup() {
  // Define form state
  const [state, setState] = useState({
    groupname: "",
    description: "",
    password: "",
    password2: "",
  });

  const user = useSelector((state) => state.auth.user);
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
    const { groupname, description, password, password2 } = state;

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      dispatch(create_group(user, groupname, description, password))
        .then(() => {
          toast.success("Group created successfully");
          navigate("/dashboard");
        })
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
              <h2 className="text-center mb-4">Create a New Group</h2>
              <Form onSubmit={handleSubmit}>
                {/* Name Input */}
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Group Name"
                    name="groupname"
                    value={state.groupname}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Group Description */}
                <Form.Group controlId="formBasicDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Group Description"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                  />
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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  onClick={handleSubmit}>
                  <Link style={{ color: "white" }} to={"/dashboard"}>
                    Add Group
                  </Link>
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateGroup;
