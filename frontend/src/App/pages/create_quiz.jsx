import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { createQuiz } from "../actions/quzes";
import { list_group } from "../actions/groups";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './css/ToastStyles.css'; // Import your custom styles

function CreateQuizPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [defaultDegree, setDefaultDegree] = useState(1); // Default degree for all questions
  const [group, setGroup] = useState(""); // Default degree for all questions
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      degree: defaultDegree,
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const groups = useSelector((state) => state.groups.groups);

  useEffect(() => {
    dispatch(list_group());
  }, [dispatch]);

  // Handle input changes for quiz title and description
  const handleTitleChange = (e) => setQuizTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle changes to the default degree for all questions
  const handleDefaultDegreeChange = (e) => {
    const degree = parseInt(e.target.value, 10) || 1;
    setDefaultDegree(degree);

    // Update the degree for all existing questions
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => ({ ...q, degree }))
    );
  };

  // Handle adding a new question with default degree
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        degree: defaultDegree,
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  // Handle removing a question
  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // Handle input changes for question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  // Handle input changes for question degree
  const handleDegreeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].degree = parseInt(value, 10) || 1;
    setQuestions(newQuestions);
  };

  // Handle input changes for answer text
  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = value;
    setQuestions(newQuestions);
  };

  // Handle checkbox toggle for correct answer
  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    const answers = newQuestions[questionIndex].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    newQuestions[questionIndex].answers = answers;
    setQuestions(newQuestions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedQuestions = questions.map((question) => ({
      question: question.questionText,
      degree: question.degree, // Include degree in submission
      answers: question.answers.map((answer) => ({
        answer: answer.text,
        is_correct: answer.isCorrect,
      })),
    }));

    const newQuiz = JSON.stringify({
      title: quizTitle,
      group: group,
      description: description,
      questions: formattedQuestions,
      author: user.id,
    });

    dispatch(createQuiz(newQuiz))
      .then(() => {
        toast.success("Quiz created successfully");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h2>Create a Quiz</h2>
              <Form onSubmit={handleSubmit}>
                {/* Quiz Title */}
                <Form.Group controlId="quizTitle" className="mb-3">
                  <Form.Label>Quiz Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={quizTitle}
                    onChange={handleTitleChange}
                    placeholder="Enter quiz title"
                    required
                  />
                </Form.Group>

                {/* Quiz Description */}
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter quiz description"
                  />
                </Form.Group>

                {/* Default Degree */}
                <Form.Group controlId="defaultDegree" className="mb-3">
                  <Form.Label>Default Degree for All Questions</Form.Label>
                  <Form.Control
                    type="number"
                    value={defaultDegree}
                    onChange={handleDefaultDegreeChange}
                    placeholder="Enter default degree"
                  />
                </Form.Group>

                <Form.Group controlId="group" className="mb-3">
                  <Form.Label>Select Quiz Group</Form.Label>
                  <Form.Select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}>
                    <option></option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.group_name}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </Form.Select>
                </Form.Group>

                <h5 className="mb-4">Questions</h5>
                {questions.map((question, qIndex) => (
                  <Card className="mb-3" key={qIndex}>
                    <Card.Body>
                      {/* Question Text */}
                      <Form.Group
                        controlId={`question${qIndex}`}
                        className="mb-3">
                        <Form.Label>Question {qIndex + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(qIndex, e.target.value)
                          }
                          placeholder="Enter question text"
                          required
                        />
                      </Form.Group>

                      {/* Question Degree */}
                      <Form.Group
                        controlId={`degree${qIndex}`}
                        className="mb-3">
                        <Form.Label>Degree for this question</Form.Label>
                        <Form.Control
                          type="number"
                          value={question.degree}
                          onChange={(e) =>
                            handleDegreeChange(qIndex, e.target.value)
                          }
                          placeholder="Enter degree"
                          required
                        />
                      </Form.Group>

                      {/* Answers */}
                      {question.answers.map((answer, aIndex) => (
                        <Form.Group
                          controlId={`answer${qIndex}-${aIndex}`}
                          className="mb-2"
                          key={aIndex}>
                          <Form.Check
                            type="checkbox"
                            label={`Answer ${aIndex + 1}`}
                            checked={answer.isCorrect}
                            onChange={() =>
                              handleCorrectAnswerChange(qIndex, aIndex)
                            }
                          />
                          <Form.Control
                            type="text"
                            value={answer.text}
                            onChange={(e) =>
                              handleAnswerChange(qIndex, aIndex, e.target.value)
                            }
                            placeholder="Enter answer text"
                            required
                          />
                        </Form.Group>
                      ))}
                      <Button
                        variant="danger"
                        onClick={() => removeQuestion(qIndex)}
                        className="mt-2">
                        Remove Question
                      </Button>
                    </Card.Body>
                  </Card>
                ))}

                <Button variant="primary" onClick={addQuestion} className="m-3">
                  Add Question
                </Button>

                <Button variant="success" type="submit" className="m-3">
                  Submit Quiz
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateQuizPage;
