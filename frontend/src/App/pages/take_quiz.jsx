import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitQuiz } from "../actions/quzes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/ToastStyles.css"; // Import your custom styles

// Example styling with CSS
const quizPageStyle = {
  width: "60%",
  margin: "auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial, sans-serif",
};

const questionStyle = {
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const degreeStyle = {
  color: "#666",
  fontSize: "14px",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "10px",
  fontSize: "24px",
  fontWeight: "bold",
};

const descriptionStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "18px",
  color: "#555",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Quiz component
const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [questions, setQuistions] = useState([]);
  const quiz = useSelector((state) => state.quizs.Quiz);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (quiz != null) {
      setQuistions(quiz.questions);
    }
  }, [quiz]);

  const handleOptionChange = (questionId, degree, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: { ...answer, degree: degree },
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);

    // Calculate total degree directly based on correct answers
    const total = Object.keys(selectedAnswers).reduce((acc, element) => {
      if (selectedAnswers[element].is_correct) {
        return acc + selectedAnswers[element].degree;
      }
      return acc;
    }, 0);

    console.log(total);

    const quizTaker = {
      user: user.id,
      quiz: quiz.id,
      score: total,
      completed: true,
      group: quiz.group,
      completed_at: new Date().toISOString(),
    };

    dispatch(submitQuiz(quizTaker))
      .then(() => {
        toast.success("Quiz submitted");
        navigate("/dashboard");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div style={quizPageStyle}>
      <h1 style={titleStyle}>{quiz ? quiz.title : ""}</h1>

      {questions.map((question, index) => (
        <div key={question.id} style={questionStyle}>
          <p>
            <strong>
              {index + 1}. {question.question}
            </strong>
          </p>
          <p className="text-end" style={degreeStyle}>
            {question.degree} points
          </p>
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <input
                type="radio"
                id={`${question.id}-${answer.id}`}
                name={`question-${question.id}`}
                value={answer}
                onChange={() =>
                  handleOptionChange(question.id, question.degree, answer)
                }
                disabled={submitted} // Disable radio buttons after submission
              />
              <label htmlFor={`${question.id}-${answer.id}`}>
                {answer.answer}
              </label>
            </div>
          ))}
        </div>
      ))}
      <strong className="text-end" style={{ display: "block", margin: "auto" }}>
        Teacher/ {quiz ? quiz.author.replace("_", " ") : ""}
      </strong>
      <br />
      <button style={buttonStyle} onClick={handleSubmit} disabled={submitted}>
        <Link to={"/dashboard"}>{submitted ? "Submitted" : "Submit Quiz"}</Link>
      </button>
    </div>
  );
};

export default Quiz;
