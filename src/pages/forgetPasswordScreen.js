import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Alert, Typography, Box } from "@mui/material"; // Sử dụng MUI
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000/users/forget-password"
      );

      setSuccess(response.data.message);
      navigate("/verify", { state: { email, mode: "forgotPassword" } }); // Điều hướng tới trang Xác thực
    } catch (error) {
      console.error("Lỗi khi gửi mã xác thực:", error); // Ghi lại lỗi để debug
      setError(
        error.response?.data?.message || "Có lỗi xảy ra khi gửi mã xác thực."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 10%",
        backgroundImage: `url('https://www.hot-dinners.com/images/stories/blog/2022/operanew2.jpg')`, // Đường dẫn tới hình nền
        backgroundSize: "cover", // Đảm bảo hình nền bao phủ toàn màn hình
        backgroundPosition: "center", // Căn giữa hình nền
        backgroundRepeat: "no-repeat", // Không lặp lại hình nền
        backgroundColor: "#ffffff", // Màu nền phụ phòng trường hợp hình ảnh không tải
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Nhập email để lấy mã xác thực
        </Typography>
        <TextField
          label="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSendCode}
          sx={{
            marginTop: 2,
            backgroundColor: "#6200ea",
            "&:hover": {
              backgroundColor: "#3700b3",
            },
          }}
        >
          Gửi mã xác thực
        </Button>
      </Card>
    </Box>
  );
};

export default ForgetPassword;
