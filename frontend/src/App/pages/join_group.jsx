import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { join_group, list_all_group } from "../actions/groups";
import { toast } from "react-toastify";
import './css/ToastStyles.css'; // Import your custom styles

const JoinGroupPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState("");
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [availableGroups, setAvailableGroups] = useState([]);

  const groups = useSelector((state) => state.groups.groups);
  const userID = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(list_all_group());
  }, [dispatch]);

  useEffect(() => {
    const joined_groups = groups.filter((group) => {
      return group.members.map((member) => member.id === userID).includes(true);
    });
    const available_groups = groups.filter(
      (group) => joined_groups.includes(group) === false
    );
    setJoinedGroups(joined_groups);
    setAvailableGroups(available_groups);
  }, [groups, userID]);

  // Handle join group logic with password verification
  const handleJoinGroup = (e) => {
    e.preventDefault();
    dispatch(join_group(password, selectedGroup.id))
      .then(() => {
        toast.success("Joined group successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Join a Group</h2>
      <Row>
        <Col md={6}>
          <h4>Available Groups</h4>
          {availableGroups.map((group) => (
            <Card
              key={group.id}
              className={`mb-3 ${
                selectedGroup && selectedGroup.id === group.id
                  ? "border-primary"
                  : ""
              }`}
              onClick={() => {
                setSelectedGroup(group);
              }}
              style={{ cursor: "pointer" }}>
              <Card.Body>
                <Card.Title>{group.group_name}</Card.Title>
                <Card.Text style={{ fontWeight: "light" }}>
                  {group.group_description}
                </Card.Text>
                <Card.Text
                  className="text-end"
                  style={{ fontWeight: "lighter" }}>
                  {group.owner_username.replace("_", " ")}
                </Card.Text>
                {selectedGroup && selectedGroup.id === group.id && (
                  <Row className="mt-4">
                    <Col md={12}>
                      <h4>Join {selectedGroup.group_name}</h4>
                      <Form onSubmit={handleJoinGroup}>
                        <Form.Group
                          controlId="formGroupPassword"
                          className="mb-3">
                          <Form.Label>Group Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter group password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                          Join Group
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={6}>
          <h4>Your Groups</h4>
          {joinedGroups.map((group) => (
            <Card
              key={group.id}
              className={`mb-3 ${
                selectedGroup && selectedGroup.id === group.id
                  ? "border-primary"
                  : ""
              }`}
              style={{ cursor: "pointer" }}>
              <Card.Body>
                <Card.Title>{group.group_name}</Card.Title>
                <Card.Text style={{ fontWeight: "light" }}>
                  {group.group_description}
                </Card.Text>
                <Card.Text
                  className="text-end"
                  style={{ fontWeight: "lighter" }}>
                  {group.owner_username.replace("_", " ")}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default JoinGroupPage;
