import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import "./CSS/settings.css"; // Custom styles
import { useDispatch, useSelector } from "react-redux";
import { updateUser, uploadImage } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/ToastStyles.css"; // Import your custom styles

function SettingsPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    currentPassword: "",
    phone: user.profile.phone,
    location: user.profile.location,
    bio: user.profile.bio,
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const newsData = new FormData();
    newsData.append("image", e.target.files[0]);

    dispatch(uploadImage(newsData))
      .then(() => {
        toast.success("Image uploaded successfully");
        navigate("/profile");
      })
      .catch((err) => toast.error(err));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for submission

    const data = {
      username: formData.username.replace(/ /g, "_"),
      email: formData.email,
      currentPassword: formData.currentPassword,
      profile: {
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
      },
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    // Dispatch Redux action or call API to update user info
    dispatch(updateUser(data))
      .then(() => {
        toast.success("Profile updated successfully");
        navigate("/profile");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Container className="settings-page my-5">
      <Row>
        <Col md={4} className="text-center">
          <Card className="shadow-sm p-3">
            <Image
              src={user.profile.image || "https://via.placeholder.com/150"} // Display the selected image or a placeholder
              roundedCircle
              className="profile-image mb-3"
              alt="Profile Preview"
            />
            <Form.Group
              controlId="formFile"
              className="mb-3"
              encType="multipart/form-data">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formBio" className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCurrentPassword" className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleOnChange}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage;
