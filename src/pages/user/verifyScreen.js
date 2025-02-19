import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Chú ý đến việc sử dụng useNavigate
import { useLocation } from "react-router-dom";
const VerifyScreen = () => {
  const location = useLocation();
  const { email, mode } = location.state; // Sử dụng `location.state` để lấy dữ liệu passed vào qua navigate
  const { verifyCode } = useAuth();
  const [code, setCode] = useState("");
  const navigate = useNavigate(); // Dùng useNavigate từ react-router-dom

  const handleVerify = async () => {
    console.log("Mode:", mode); // Kiểm tra giá trị của mode
    try {
      const response = await verifyCode(email, code);
      if (response.success) {
        if (mode === "register") {
          alert(
            "Xác thực thành công. Tài khoản của bạn đã được xác thực, hãy đăng nhập và mua hàng!"
          );
          navigate("/signin"); // Điều hướng tới LoginScreen
        } else if (mode === "forgotPassword") {
          navigate("/new-password", { state: { email } }); // Ví dụ cho quên mật khẩu
        }
      } else {
        throw new Error("Mã xác thực không hợp lệ. Vui lòng nhập lại!");
      }
    } catch (error) {
      alert("Lỗi xác thực", "Mã xác thực không đúng, vui lòng nhập lại!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>XÁC THỰC TÀI KHOẢN</h2>
        <p style={styles.subtitle}>
          Một mã xác thực đã được gửi đến email {email}. Hãy nhập mã xác thực
          dưới đây.
        </p>

        <input
          type="text"
          placeholder="Nhập mã xác thực"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleVerify} style={styles.button}>
          Xác thực
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
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
  },
  formContainer: {
    maxWidth: "400px",
    width: "100%",
    textAlign: "left",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff4d4f",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default VerifyScreen;
