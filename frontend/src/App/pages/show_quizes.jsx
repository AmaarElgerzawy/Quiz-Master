import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { enterQioz } from "../actions/quzes";
import { getQuizs } from "../actions/quzes";
import { inQuiz } from "../actions/auth";
import "./CSS/show_quizes.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './css/ToastStyles.css'; // Import your custom styles

const QuizPage = () => {
  const dispatch = useDispatch();
  const allQuizzes = useSelector((state) => state.quizs.allQuizzes);

  const [quizzesTaken, setQuizzesTaken] = useState([]);
  const [quizzesNotTaken, setQuizzesNotTaken] = useState([]);

  useEffect(() => {
    dispatch(getQuizs());
  }, [dispatch]);

  useEffect(() => {
    // Filter quizzes based on whether they have been taken or not
    if (allQuizzes.length > 0) {
      const taken = allQuizzes.filter((quiz) => quiz.quiz_taker != null);
      const notTaken = allQuizzes.filter((quiz) => quiz.quiz_taker == null);

      setQuizzesTaken(taken);
      setQuizzesNotTaken(notTaken);
    }
  }, [allQuizzes]);

  return (
    <Container fluid className="my-5">
      <h2 className="text-center mb-4 h2">Your Quizzes</h2>
      <Row>
        <Col md={6}>
          <h4 className="mb-3 h3">Quizzes Taken</h4>
          <Row>
            {quizzesTaken.length > 0 ? (
              quizzesTaken.map((quiz, index) => (
                <Col md={12} className="mb-3" key={index}>
                  <QuizCard
                    quiz={quiz}
                    isTaken
                    degree={quiz.quiz_taker.score}
                  />
                </Col>
              ))
            ) : (
              <Col>No quizzes taken yet!</Col>
            )}
          </Row>
        </Col>
        <Col md={6}>
          <h4 className="mb-3 h3">Quizzes Not Taken</h4>
          <Row>
            {quizzesNotTaken.length > 0 ? (
              quizzesNotTaken.map((quiz) => (
                <Col md={12} className="mb-3">
                  <QuizCard
                    id={quiz.id}
                    quiz={quiz}
                    degree={quiz.total_degree}
                  />
                </Col>
              ))
            ) : (
              <Col>
                <p>You've completed all the quizzes!</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

// Component to render a Quiz Card
const QuizCard = ({ quiz, isTaken, id, degree }) => {
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    dispatch(enterQioz(id))
      .then(() => {
        toast.success("Quiz started");
        dispatch(inQuiz());
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Card className="shadow-sm" key={id}>
      <Card.Body>
        <Card.Title>{quiz.title}</Card.Title>
        <br />
        <Card.Text>{quiz.description}</Card.Text>
        <br />
        {isTaken ? (
          <Card.Text style={{ color: "gray" }}>Your Degree: {degree}</Card.Text>
        ) : (
          <>
            <Card.Text style={{ color: "gray" }}>Degree: {degree}</Card.Text>
            <Button
              variant={isTaken ? "primary" : "success"}
              onClick={handleOnSubmit}>
              <Link to={"/takequiz"}>Start Quiz</Link>
            </Button>
          </>
        )}

        <br />
        <Card.Text>
          Created At: {quiz.created_at.split(".")[0].replace("T", " ")}
        </Card.Text>
        <Card.Text>
          Taken At:{" "}
          {quiz.quiz_taker && quiz.quiz_taker.completed_at != null
            ? quiz.quiz_taker.completed_at.split(".")[0].replace("T", " ")
            : "In Quiz"}
        </Card.Text>
        <Card.Text className="text-end">
          {quiz.author.gender == "F" ? "Mrs/ " : "Mr/ "}
          {quiz.author.username.replace("_", " ")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default QuizPage;
