import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import {Link} from "react-router-dom"
import "./CSS/profile.css"; // Custom styles
import './css/ToastStyles.css'; // Import your custom styles

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container className="profile-page my-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Image
                src={ user.profile.image || "https://via.placeholder.com/150"}
                roundedCircle
                className="profile-image mb-3"
              />
              <h3>{user.username}</h3>
              <p className="text-muted">{user.email}</p>
              <p className="text-muted">
                {user.groups.map((ele, index) =>
                  index !== user.groups.length - 1 ? `${ele}\t&\t` : `${ele}\t`
                )}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5>Profile Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <h6 className="fw-bold">Full Name</h6>
                  <p>{user.username}</p>
                </Col>
                <Col xs={6}>
                  <h6 className="fw-bold">Email</h6>
                  <p>{user.email}</p>
                </Col>
              </Row>

              <Row>
                <Col xs={4}>
                  <h6 className="fw-bold">Phone</h6>
                  <p>{user.profile.phone}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="fw-bold">Location</h6>
                  <p>{user.profile.location}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="fw-bold">Gender</h6>
                  <p>{user.profile.gender == "F" ? "Female" : "Male"}</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h6 className="fw-bold">Bio</h6>
                  <p>{user.profile.bio}</p>
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button variant="primary" className="mt-2">
                  <Link to="/settings">Edit Profile</Link>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
