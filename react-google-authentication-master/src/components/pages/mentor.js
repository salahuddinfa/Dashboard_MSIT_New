import React from "react";
import axios from "axios";
import SearchBar from "../SearchBar";
import Display from "../ScoreDisplay";
import DisplayGrades from "../GradesDisplay";
import { Jumbotron, Tabs, Tab } from "react-bootstrap";
import PerformanceDisplay from "../NEW_PerformanceDisplay";
import PresentationDisplay from "../PresentationDisplay";

export default function MentorDashboard(props) {
  //hooks to store th values
  const [displayFlag, setDisplayFlag] = React.useState(false);
  const [errorFlag, setErrorFlag] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [studentEmail, setStudentEmail] = React.useState("");

  const [data, setData] = React.useState("");
  const [score, setScore] = React.useState("");
  const [ss_score, setSSScore] = React.useState("");
  const [dropoutFlag, setDropoutFlag] = React.useState(false);

  const [key, setKey] = React.useState("performance");

  return (
    //displays the page heading
    <div>
      <br />
      <Jumbotron
        style={{
          height: "100px",
          padding: "0px",
          fontFamily: "Raleway",
          backgroundColor: "#001340",
        }}
      >
        <img
          style={{
            height: "100px",
          }}
          src={process.env.PUBLIC_URL + "/msit_new_logo.png"}
          alt="MSIT Logo"
          align="left"
        />
        <br />
        <h1 style={{ color: "white" }}>Mentor Dashboard</h1>
        {/* <hr style={{ color: "#6E85BA" }} /> */}
      </Jumbotron>

      <SearchBar
        mentorEmail={props.mentorEmail}
        updateDisplayFlag={setDisplayFlag}
        updateErrorFlag={setErrorFlag}
        updateErrorMsg={setErrorMsg}
        updateStudentEmail={setStudentEmail}
        updateData={setData}
        updateScore={setScore}
        updateSSScore={setSSScore}
        options={props.studentEmailList}
        updateDropoutFlag={setDropoutFlag}
      />
      {errorFlag ? (
        <div>
          <h5>{errorMsg}</h5>
        </div>
      ) : (
        <div></div>
      )}
      <br />
      {dropoutFlag ? (
        <h5
          style={{
            fontFamily: "Raleway",
          }}
        >
          Student has dropped out
        </h5>
      ) : (
        <React.Fragment></React.Fragment>
      )}

      {displayFlag ? (
        <div>
          <React.Fragment>
            {typeof data.dashboard_data !== typeof undefined_var &&
            data.dashboard_data !== "File Does not exist" ? (
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="performance" title="Performance">
                  <PerformanceDisplay
                    mentor={props.mentorFlag}
                    email={studentEmail}
                    attendance={data.dashboard_data.attendance}
                    grades={data.dashboard_data.grades}
                    lastUpdated={data.dashboard_data.last_updated}
                    courseStats={data.course_stats}
                    percentageIT={data.course_attendance.IT}
                    percentageSS={data.course_attendance.SS}
                    learningCenter={data.dashboard_data.learning_center}
                  />
                </Tab>
                <Tab eventKey="attendance" title="Attendance">
                  <Display
                    mentor={props.mentorFlag}
                    userEmail={studentEmail}
                    res={data}
                    lastUpdated={data.last_updated}
                    learningCenter={data.dashboard_data.learning_center}
                    score={score}
                    ss_score={ss_score}
                  />
                </Tab>

                <Tab eventKey="presentation" title="Presentations">
                  <PresentationDisplay
                    mentor={props.mentorFlag}
                    email={studentEmail}
                    lastUpdated={data.last_updated}
                    res={data}
                    learningCenter={data.dashboard_data.learning_center}
                    pptScores={data.dashboard_data.ppt_scores}
                  />
                </Tab>
                <Tab eventKey="transcript" title="Transcript">
                  <DisplayGrades
                    mentor={props.mentorFlag}
                    email={studentEmail}
                    res={data}
                    lastUpdated={data.last_updated}
                    learningCenter={data.dashboard_data.learning_center}
                  />
                </Tab>
              </Tabs>
            ) : (
              <div></div>
            )}
            <br />
          </React.Fragment>
        </div>
      ) : (
        <div>
          <br />
          <h5 style={{ fontFamily: "Avenir" }}>
            Please enter the student's email and hit search
          </h5>
        </div>
      )}
    </div>
  );
}
