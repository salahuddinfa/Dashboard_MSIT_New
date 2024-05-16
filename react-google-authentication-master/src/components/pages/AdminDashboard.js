import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import Logout from "../Logout";
export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [role, setRole] = useState(""); // Updated to include role
  const [batch, setBatch] = useState(""); // Updated to include batch
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add-user/", {
  email,
  name,
  phone_num: phoneNum,
  role,
  batch
}, {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
      console.log("Response from server:", response.data);
      setSuccessMessage(response.data.message);
      setEmail("");
      setName("");
      setPhoneNum("");
      setRole("");
      setBatch("");
      setShowModal(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("csv", file);
    try {
      const response = await axios.post("/upload-csv/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        setSuccessMessage("Users added successfully from CSV.");
      } else {
        setErrorMessage("Failed to add users from CSV.");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div>
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
        <h1 style={{ color: "white", fontWeight: "bold" }}>Admin Dashboard</h1>
      </Jumbotron>
      <div style={{ marginBottom: '10px', }}>
        <Button variant="primary" onClick={() => { setShowModal(true); setRole("student"); }}>
          Add Student
        </Button>
        <Button variant="primary" onClick={() => { setShowModal(true); setRole("mentor"); }}>
          Add Mentor
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{`Add ${role.charAt(0).toUpperCase() + role.slice(1)}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phoneNum">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="batch">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            </Form.Group>
            {/* Add CSV upload button */}
            <Form.Group controlId="csvUpload">
              <Form.Label>{`Add ${role}s from CSV`}</Form.Label>
              <Form.File
                id="custom-file"
                label="Choose CSV file"
                custom
                onChange={handleCSVUpload}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            {`Add ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </Button>
        </Modal.Footer>
      </Modal>
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Logout/>
    </div>
  );
}