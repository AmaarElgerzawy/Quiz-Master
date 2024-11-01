import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listNews } from "../actions/news";
import { FaTrash } from "react-icons/fa";
import { deleteNews } from "../actions/news";
import { toast } from "react-toastify";
import "./CSS/NewsCard.css"; // Import custom styles
import "./css/ToastStyles.css"; // Import your custom styles

function Dashboard() {
  // Sample news data
  const news = useSelector((state) => state.news.news);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listNews());
  }, [dispatch]);

  const handelRemoveNews = (newsId, e) => {
    e.preventDefault();
    dispatch(deleteNews(newsId))
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(listNews());
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Container fluid className="p-5">
      {/* Title Section */}
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h1 className="display-4">Welcome to Your Dashboard</h1>
          <p className="lead">
            Stay updated with the latest news and access your quizzes and
            grades.
          </p>
        </Col>
      </Row>

      <Row>
        {/* News Section */}
        <Col md={12}>
          <h2 className="mb-4">Latest News</h2>
          {news.map((news, index) => (
            <Card className="mb-4 shadow-lg" key={index}>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={news.image}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "400px",
                      }}
                    />
                  </Col>
                  <Col md={8}>
                    <Card className="h-100 d-flex flex-column">
                      {/* Card Title */}
                      <Card.Body className="flex-grow-1">
                        <Card.Title className="h2">{news.title}</Card.Title>
                        <br />
                        <Card.Text>{news.content}</Card.Text>
                      </Card.Body>

                      {/* Card Footer */}
                      <Card.Footer className="text-muted d-flex justify-content-between">
                        {user.id == news.author && (
                          <FaTrash
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={(e) => handelRemoveNews(news.id, e)}
                          />
                        )}
                        <Card.Text className="text-end">
                          Published by {news.author} on{" "}
                          {new Date(news.created_at).toLocaleDateString()} at{" "}
                          {new Date(news.created_at).toLocaleTimeString()}
                        </Card.Text>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
