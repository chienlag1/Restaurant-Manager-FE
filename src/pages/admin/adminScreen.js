import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([
        ...(response.data.admins || []),
        ...(response.data.users || []),
      ]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?")) {
      try {
        await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleUpdateRole = async () => {
    if (selectedUser && selectedUser.role === "admin") {
      // Nếu người dùng đã là admin, hiển thị thông báo
      alert("This user is already an admin, role cannot be updated.");
      return; // Dừng việc thực hiện tiếp tục
    }

    if (selectedUser && selectedUser.role !== "admin") {
      // Hiển thị thông báo xác nhận trước khi thay đổi vai trò
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user to an admin?"
      );
      if (confirmUpdate) {
        try {
          await axios.put(
            `http://localhost:5000/admin/updateRole/${selectedUser._id}`,
            { role: "admin" },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === selectedUser._id ? { ...user, role: "admin" } : user
            )
          );
          setShowUserModal(false);
        } catch (error) {
          console.error("Error updating role:", error);
        }
      } else {
        console.log("Role update cancelled.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleView(user)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                      disabled={user.role === "admin"} // Disable "Delete" button for admins
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Loading users...
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal hiển thị thông tin chi tiết người dùng */}
      <Modal
        show={showUserModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        animation={true}
        className="modal-dialog-scrollable"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {selectedUser.phoneNumber || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
            </div>
          ) : (
            <p>No user selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateRole}>
            Update role
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminScreen;
