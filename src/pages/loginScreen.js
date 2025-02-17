import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/menu");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>WELCOME BACK</h2>
        <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} /> Remember me
            </label>
            <button
              type="button"
              style={styles.forgotPassword}
              onClick={() => navigate("/forget-password")}
            >
              Forgot password
            </button>
          </div>
          <button type="submit" style={styles.signInButton}>
            Sign in
          </button>
          <button type="button" style={styles.googleButton}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              style={styles.googleIcon}
            />
            Sign in with Google
          </button>
        </form>
        <p style={styles.footerText}>
          Don't have an account?{" "}
          <span style={styles.signUpLink} onClick={() => navigate("/signup")}>
            Sign up for free!
          </span>
        </p>
      </div>
    </div>
  );
};

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
  loginBox: {
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
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#777777",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#555",
  },
  checkbox: {
    marginRight: "5px",
  },
  forgotPassword: {
    color: "#777777",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },
  signInButton: {
    padding: "12px",
    backgroundColor: "#FF4A57",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    backgroundColor: "#ffffff",
    color: "#555555",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
  },
  footerText: {
    fontSize: "14px",
    color: "#777777",
    textAlign: "center",
  },
  signUpLink: {
    color: "#FF4A57",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },
  imageContainer: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    maxWidth: "400px",
  },
};

export default LoginScreen;
