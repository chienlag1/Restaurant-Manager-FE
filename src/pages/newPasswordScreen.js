import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Card, Typography, Box, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const NewPasswordScreen = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ location.state
  const { email } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu không khớp, vui lòng kiểm tra lại!");
      return;
    }

    try {
      const response = await resetPassword(email, newPassword);
      if (response.success) {
        setError(null);
        setSuccess("Mật khẩu đã được đặt lại thành công.");
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      setError(error.message || "Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url('https://img.lovepik.com/background/20211029/medium/lovepik-canvas-shoe-wallpaper-background-image_400288297.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card sx={{ padding: 4, width: "100%", maxWidth: 400, boxShadow: 5 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 3 }}
        >
          Đặt lại mật khẩu
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}

        <TextField
          label="Mật khẩu mới"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Xác nhận mật khẩu"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResetPassword}
          sx={{
            paddingY: 1.5,
            textTransform: "none",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Đặt lại mật khẩu
        </Button>
      </Card>
    </Box>
  );
};

export default NewPasswordScreen;
