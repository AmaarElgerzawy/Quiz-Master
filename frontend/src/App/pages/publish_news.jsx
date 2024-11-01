import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { publishNews } from "../actions/news";
import { list_group } from "../actions/groups";
import { toast } from "react-toastify";
import "./css/ToastStyles.css"; // Import your custom styles

const PublishNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groups = useSelector((state) => state.groups.groups);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [group, setGroup] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(list_group());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("content", content);
    newsData.append("group", group);

    if (image) {
      newsData.append("image", image); // Append image if it's selected
    }

    dispatch(publishNews(newsData)).then(() => {
      toast.success("News published successfully");
      navigate("/");
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Publish News</h2>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="newsTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the news title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="newsContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write the content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="newsGroup" className="mb-3">
              <Form.Label>Group</Form.Label>
              <Form.Control
                as="select"
                value={group || ""}
                onChange={(e) => setGroup(e.target.value)}>
                <option value="">Select a group...</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.group_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="newsImage" className="mb-4">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Publish
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PublishNews;
