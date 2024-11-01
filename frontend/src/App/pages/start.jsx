import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import './css/ToastStyles.css'; // Import your custom styles
import "./CSS/start.css";

function StartPage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Container
      fluid
      className="start-page d-flex justify-content-center align-items-center min-vh-100">
      <Row className="text-center">
        {/* Title Section */}
        <Col xs={12} className="mb-4">
          <h1 className="display-4 fw-bold">Welcome to Quiz Master!</h1>
          <p className="lead">
            Test your knowledge and challenge yourself with our exciting
            quizzes.
          </p>
        </Col>

        {/* Quiz Card Section */}
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Image
              src="https://www.dragnsurvey.com/blog/en/wp-content/webp-express/webp-images/uploads/2024/04/quiz-contest-test.jpg.webp" // Placeholder for now
              alt="Quiz illustration"
              fluid
              className="mb-3"
            />
            <Card.Body>
              <Card.Title className="mb-3">
                Are you ready to start the quiz?
              </Card.Title>
              <Card.Text className="mb-4">
                Get ready to dive into a world of knowledge! Whether you're here
                for fun or to test your brainpower, we've got the perfect quiz
                for you.
              </Card.Text>
              <Button
                href={isAuthenticated ? "/quizes" : "/signin"}
                variant="success"
                size="lg"
                className="fw-bold px-5 py-3">
                Show Quizzes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StartPage;
