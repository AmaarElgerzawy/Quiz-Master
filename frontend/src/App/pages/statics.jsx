import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./CSS/statics.css";
import { getQuizs } from "../actions/quzes";
import './css/ToastStyles.css'; // Import your custom styles

// Register the components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatisticsPage() {
  const dispatch = useDispatch();
  const quizs = useSelector((state) => state.quizs.allQuizzes);
  const [data, setData] = useState({});
  const [innerData, setInnerData] = useState([]);

  const [rewards, setRewards] = useState(0);
  const [totalDegree, setTotalDegree] = useState(0);

  // Configuration options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quiz Performance",
      },
    },
  };

  useEffect(() => {
    dispatch(getQuizs());
  }, [dispatch]);

  // Debugging useEffect to log `data` updates
  useEffect(() => {
    setInnerData(quizs.filter((quiz) => quiz.quiz_taker !== null));
  }, [quizs]);

  useEffect(() => {
    if (innerData && innerData.length > 0) {
      const correctAnswers = innerData.map(
        (quiz) => (quiz.quiz_taker.score / quiz.total_degree) * 100
      );
      const wrongAnswers = innerData.map(
        (quiz) => 100 - (quiz.quiz_taker.score / quiz.total_degree) * 100
      );
      const chartData = {
        labels: innerData.map((quiz) => quiz.title),
        datasets: [
          {
            label: "Correct Answers",
            data: correctAnswers,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Wrong Answers",
            data: wrongAnswers,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      };

      setData(chartData);
    }

    setRewards(
      innerData.reduce(
        (accumulator, quiz) => accumulator + quiz.quiz_taker.score,
        0
      )
    );

    setTotalDegree(
      innerData.reduce(
        (accumulator, quiz) => accumulator + quiz.total_degree,
        0
      )
    );
  }, [innerData]);

  return (
    <Container fluid className="statistics-page py-5">
      <Row>
        {/* Overall Stats Cards */}
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Card className="shadow-lg p-3 text-center">
            <Card.Body>
              <h5>Total Quizzes Taken</h5>
              <h2 className="display-4">{innerData.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Card className="shadow-lg p-3 text-center">
            <Card.Body>
              <h5>Total Reward</h5>
              <h2 className="display-4">{rewards}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Card className="shadow-lg p-3 text-center">
            <Card.Body>
              <h5>Total Loses</h5>
              <h2 className="display-4">{totalDegree - rewards}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Card className="shadow-lg p-3 text-center">
            <Card.Body>
              <h5>Accuracy</h5>
              <h2 className="display-4">{(rewards/totalDegree) * 100}%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Performance Chart */}
      <Row className="mt-5">
        <Col xs={12} md={10} lg={8} className="mx-auto">
          <h3 className="text-center mb-4">Quiz Performance Overview</h3>
          {data.labels && data.labels.length > 0 ? (
            <Bar data={data} options={options} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default StatisticsPage;
