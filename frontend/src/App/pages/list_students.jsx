import React, { useEffect } from "react";
import { show_group } from "../actions/groups";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { removeStudent } from "../actions/groups";
import './css/ToastStyles.css'; // Import your custom styles

// Example styles
const containerStyle = {
  width: "80%",
  margin: "50px auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "28px",
  marginBottom: "30px",
  color: "#333",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
  border: "1px solid #ddd",
};

const thStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "12px",
  textAlign: "left",
  borderTop: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const studentRowStyle = {
  backgroundColor: "#fff",
  textAlign: "center",
};

const highGradeStyle = {
  backgroundColor: "#d4edda",
};

const lowGradeStyle = {
  backgroundColor: "#f8d7da",
};

const nestedTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid #ddd",
};

const nestedTdStyle = {
  padding: "8px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
};

const StudentList = () => {
  const { pk } = useParams();
  const dispatch = useDispatch();
  const groupData = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(show_group(pk));
  }, [dispatch, pk]);

  const handleRemoveStudent = (pk, e) => {
    e.preventDefault();
    dispatch(removeStudent(groupData.id, pk));
  };

  // Handle loading state
  if (!groupData || !groupData.members) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        <div>Group {groupData.group_name}</div>
        <p style={{ fontSize: "12px" }}>{groupData.group_description}</p>
      </h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Student Name</th>
            <th style={thStyle}>Grades</th>
          </tr>
        </thead>
        <tbody>
          {groupData.members.map((student, group_index) => (
            <tr key={group_index} style={studentRowStyle}>
              <td style={tdStyle}>
                {student.username.replace("_", " ")}{" "}
                <FaTrash
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={(e) => handleRemoveStudent(student.id, e)}
                />
              </td>

              <td style={tdStyle}>
                <table style={nestedTableStyle}>
                  <thead>
                    <tr>
                      <th style={nestedTdStyle}>Quiz</th>
                      <th style={nestedTdStyle}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.quiz_takers
                      .filter((taker) => -taker.group === -pk) // Filter by group
                      .map((taker, taker_index) => (
                        <tr key={taker_index} style={studentRowStyle}>
                          <td style={nestedTdStyle}>{taker.quiz_title}</td>
                          <td
                            style={{
                              ...nestedTdStyle,
                              ...(taker.score / taker.total_degree >= 0.6
                                ? highGradeStyle
                                : lowGradeStyle),
                            }}>
                            {taker.score}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
