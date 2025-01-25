import React, { useEffect, useState } from "react";
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
