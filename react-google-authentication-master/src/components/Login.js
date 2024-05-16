import axios from "axios";
import React, { useState, useEffect }  from "react";
import Papa from 'papaparse';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import AdminDashboard from "./pages/AdminDashboard";
import MentorDashboard from "./MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import LandingPage from "./LandingPage";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "517972967421-7vd20rig40hriq0rlapi67al4q717n05.apps.googleusercontent.com";
function Login(props) {

  const history = useHistory();

  const onSuccess = async (res) => {
    alert(`Logged in successfully welcome ${res.profileObj.name}`);
    console.log("Login successful");

    axios
      .get(
        `https://7seqbvouv4.execute-api.ap-south-1.amazonaws.com/default/StudentZoomData_MentorDashboard/?mentor_email=${res.profileObj.email}&operation=mentor_check`
      )
      .then((response) => {
        props.updateMentorFlag(response.data.mentor);
        props.updateStudentEmailList(response.data.student_email_list);
      });

    let email = res.profileObj.email;
    if (props.mentor) email = props.studentEmail;

    axios
      .get(
        `https://7seqbvouv4.execute-api.ap-south-1.amazonaws.com/StudentZoom/StudentZoomData_CoursePerformance/?email=${email}`
      )
      .then((response) => {
        if (response.data === "Student dropped out") {
          props.updateDropoutFlag(true);
        } else {
          props.updateData(response.data);
          props.updateScore(response.data.course_attendance.IT);
          props.updateSSScore(response.data.course_attendance.SS);
        }
      });

      const csvFilePath = '/data.csv'; // Adjust the path based on your project structure
      const response = await axios.get(csvFilePath);

      // Parse CSV data
      const csvData = Papa.parse(response.data, { header: true });
      console.log(csvData);
      const userData = csvData.data.find((user) => user.email === email);

      if (!userData) {
        alert('User not found.');
        return;
      }

      const role = userData.role;

      // Redirect based on role
      switch (role) {
        case 'student':
          history.push('/student-dashboard');
          break;
        case 'mentor':
          history.push('/mentor-dashboard');
          break;
        case 'admin':
          history.push('/admin-dashboard');
          break;
        default:
          alert('Role not found or invalid.');
          break;
      }

    props.updateLogin(true);
    props.updateEmail(res.profileObj.email);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert('Failed to login.');
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "0px" }}
        // isSignedIn={true}
      />
      <br />
      <br />
    </div>
  );
}

export default Login;
