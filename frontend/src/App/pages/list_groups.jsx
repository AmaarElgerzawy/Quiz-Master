import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { list_group } from "../actions/groups";
import { Link } from "react-router-dom";
import './css/ToastStyles.css'; // Import your custom styles

// Custom GroupCard component to display each group
const GroupCard = ({ group }) => (
  <Link to={`/studentlist/${group.id}`}>
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {group.group_name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {group.group_description}
        </Typography>
        <Typography variant="body2">Members: {group.members.length}</Typography>
      </CardContent>
    </Card>
  </Link>
);

// Main GroupsList component
const GroupsList = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  useEffect(() => {
    dispatch(list_group());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Groups
        </Typography>

        {groups.length === 0 ? (
          <Typography>No groups found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {groups.map((group) => (
              <Grid item xs={12} md={6} lg={4} key={group.id}>
                <GroupCard group={group} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default GroupsList;
