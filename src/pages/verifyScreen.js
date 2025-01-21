import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
} from "@mui/material";

const VerifyScreen = () => {
  const { verifyCode } = useAuth();
  const { state } = useLocation(); // Lấy state được truyền từ navigate
  const navigate = useNavigate(); // Hook điều hướng
  const { email, mode } = state || {}; // Destructure state, kiểm tra nếu state tồn tại
  const [code, setCode] = useState(""); // Input mã xác thực
  const [error, setError] = useState(""); // Xử lý lỗi

  const handleVerify = async () => {
    try {
      console.log("Mode:", mode); // Debug mode
      // Mô phỏng verify code (mã hợp lệ: "1234")
      const response = await verifyCode(email, code);

      if (response.success) {
        if (mode === "register") {
          alert("Tài khoản đã được xác thực! Hãy đăng nhập.");
          navigate("/login"); // Điều hướng tới trang đăng nhập
        } else if (mode === "forgotPassword") {
          alert("Mã xác thực hợp lệ. Nhập mật khẩu mới!");
          navigate("/reset-password", { state: { email } }); // Điều hướng đặt lại mật khẩu
        }
      } else {
        throw new Error("Mã xác thực không hợp lệ!");
      }
    } catch (e) {
      setError(e.message || "Lỗi xác thực. Vui lòng thử lại.");
    }
  };

  // Phần JSX của VerifyScreen
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://example.com/background-image.jpg')", // Đường dẫn hình nền
        backgroundSize: "cover",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Xác thực tài khoản
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography gutterBottom>
              Vui lòng nhập mã xác thực đã gửi đến email:{" "}
              <strong>{email}</strong>
            </Typography>
            <TextField
              label="Nhập mã xác thực"
              fullWidth
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerify}
            >
              Xác thực
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VerifyScreen;
