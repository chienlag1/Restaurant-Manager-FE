import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Gửi thông tin người dùng qua API
      await signup(username, email, password);

      // Hiển thị thông báo thành công
      alert(
        "Đăng ký thành công! Hãy kiểm tra email của bạn để nhận mã xác thực tài khoản."
      );

      // Điều hướng tới trang verify và truyền `email` + `mode`
      navigate("/verify", {
        state: { email, mode: "register" },
      });
    } catch (error) {
      // Thông báo lỗi
      alert("Lỗi đăng ký: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>SIGN UP</h2>
        <p style={styles.subtitle}>Sign up! Please enter your details.</p>

        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <div style={styles.checkboxContainer}>
          <input type="checkbox" style={styles.checkbox} />
          <label style={styles.checkboxLabel}>
            By clicking "Create account" or "Continue with Google", you agree to
            the Privacy Policy.
          </label>
        </div>

        <button onClick={handleSignup} style={styles.button}>
          Create account
        </button>

        <button style={styles.googleButton}>
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google Icon"
            style={styles.googleIcon}
          />
          Continue with Google
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.signInLink} onClick={() => navigate("/signin")}>
            Sign in here!
          </span>
        </p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
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
    margin: "auto",
    maxWidth: "400px",
    width: "100%",
    textAlign: "left",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng mờ để nổi bật hơn
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Đổ bóng
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
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
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkbox: {
    marginRight: "8px",
  },
  checkboxLabel: {
    fontSize: "12px",
    color: "#666",
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
    marginBottom: "15px",
  },
  googleButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: "10px",
  },
  footerText: {
    fontSize: "12px",
    textAlign: "center",
    color: "#666",
    marginTop: "10px",
  },
  signInLink: {
    color: "#ff4d4f",
    fontWeight: "bold",
    cursor: "pointer",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideImage: {
    maxWidth: "400px",
    height: "auto",
  },
};

export default SignupScreen;
