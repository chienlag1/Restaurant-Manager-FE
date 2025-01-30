import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap"; // Import Bootstrap button
import UpdateProfile from "./updateProfileScreen";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Điều hướng đến trang đăng nhập nếu không có user
    } else {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/profile`, // Đường dẫn API chính xác
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Gửi token xác thực
              },
            }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        }
      };

      fetchProfileData();
    }
  }, [user, navigate]);

  const handleShowModal = () => {
    setShowModal(true); // Hiển thị Modal khi nhấn nút Update Profile
  };

  const handleCloseModal = () => {
    setShowModal(false); // Đóng Modal
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  if (!profileData) {
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="row">
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            className="rounded-circle mt-5"
            width="150px"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
          <span className="font-weight-bold">{profileData.username}</span>
          <span className="text-black-50">{profileData.email}</span>
        </div>
      </div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Username</label>
              <input
                type="text"
                className="form-control"
                value={profileData.username}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Email</label>
              <input
                type="text"
                className="form-control"
                value={profileData.email}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Mobie number</label>
              <input
                type="text"
                className="form-control"
                value={profileData.mobileNumber}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Address</label>
              <input
                type="text"
                className="form-control"
                value={profileData.address}
                disabled
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="labels">Role</label>
              <input
                type="text"
                className="form-control"
                value={profileData.role}
                disabled
              />
            </div>
          </div>

          {/* Add button to show Modal */}
          <div className="mt-5 text-center d-flex">
            <div className="button-container">
              <Button
                variant="primary"
                className="profile-button"
                onClick={handleShowModal} // Trigger modal display
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal component to update profile */}
      <UpdateProfile
        show={showModal}
        handleClose={handleCloseModal}
        profileData={profileData} // Pass profile data to modal for editing
      />
    </div>
  );
};

export default Profile;
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/signin");
        return;
      }

      setLoading(true);
      const response = await axios.get(
        "https://http://localhost:5000/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  const ProfileItem = ({ icon: Icon, label, value }) => (
    <Paper
      sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}
      elevation={2}
    >
      <Box sx={{ mr: 2 }}>
        <Icon color="primary" />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profileData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Không thể tải thông tin người dùng
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: 200,
          background: "linear-gradient(135deg, #007aff, #1e90ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          position: "relative",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "white",
            color: "#007aff",
            fontSize: "2rem",
          }}
        >
          {profileData.username[0].toUpperCase()}
        </Avatar>
      </Box>
      <Box textAlign="center" mt={2}>
        <Typography variant="h5" fontWeight={600}>
          {profileData.username}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData.email}
        </Typography>
      </Box>

      <Box mt={4}>
        <ProfileItem
          icon={PhoneIcon}
          label="Số điện thoại"
          value={profileData.phoneNumber || "N/A"}
        />
        <ProfileItem
          icon={HomeIcon}
          label="Địa chỉ"
          value={profileData.address || "N/A"}
        />
        <ProfileItem
          icon={CalendarTodayIcon}
          label="Ngày tạo"
          value={new Date(profileData.createdAt).toLocaleDateString()}
        />
      </Box>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate("/edit-profile")}
          >
            Chỉnh sửa
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LockIcon />}
            onClick={() => navigate("/change-password")}
          >
            Đổi mật khẩu
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

