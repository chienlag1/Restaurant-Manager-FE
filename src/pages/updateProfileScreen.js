import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function UpdateProfile({ show, handleClose, profileData, onProfileUpdate }) {
  const { user } = useAuth();
  const [updatedProfileData, setUpdatedProfileData] = useState({
    username: "",
    phoneNumber: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    if (profileData) {
      setUpdatedProfileData({
        username: profileData.username,
        phoneNumber: profileData.phoneNumber || "",
        address: profileData.address || "",
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/profile",
        updatedProfileData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Gọi onProfileUpdate để cập nhật profileData trong Profile component
      onProfileUpdate(response.data);
      alert("Profile updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={updatedProfileData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={updatedProfileData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={updatedProfileData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={updatedProfileData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              {/* Thêm các lựa chọn khác nếu cần */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateProfile;
