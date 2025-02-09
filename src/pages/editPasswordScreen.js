import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function EditPasswordScreen({ show, handleClose, onResetPassword }) {
  const { resetPassword } = useAuth(); // Access resetPassword from AuthContext
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Handle password reset
  const handleResetPassword = async () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword(email, oldPassword, newPassword);
      alert("Password reset successfully!");
      onResetPassword(response.data);
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              placeholder="Enter old password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </Form.Group>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPasswordScreen;
