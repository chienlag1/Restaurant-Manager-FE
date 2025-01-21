import React, { useState } from "react";
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

const VerifyScreen = ({ email, mode, onVerifySuccess, navigate }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    console.log("Mode:", mode); // Kiểm tra giá trị của mode
    try {
      // Mô phỏng việc gọi hàm verifyCode (cần tích hợp API thật khi áp dụng)
      const response = { success: code === "1234" }; // Ví dụ mã hợp lệ là "1234"
      if (response.success) {
        if (mode === "register") {
          alert(
            "Tài khoản của bạn đã được xác thực! Hãy đăng nhập và tận hưởng mua sắm."
          );
          navigate("/login");
        } else if (mode === "forgotPassword") {
          alert("Mã xác thực hợp lệ. Nhập mật khẩu mới!");
          navigate("/reset-password", { state: { email } });
        }
        onVerifySuccess && onVerifySuccess();
      } else {
        throw new Error("Mã xác thực không hợp lệ. Vui lòng nhập lại!");
      }
    } catch (e) {
      setError(e.message || "Lỗi xác thực. Vui lòng thử lại.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage:
          "url('https://img.lovepik.com/background/20211029/medium/lovepik-canvas-shoe-wallpaper-background-image_400288297.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
            >
              Xác thực tài khoản
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Typography variant="body1" gutterBottom>
              Nhập mã xác thực đã được gửi tới email: <strong>{email}</strong>
            </Typography>
            <TextField
              label="Nhập mã xác thực"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerify}
              fullWidth
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
