// /context/AuthContext.js

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Tạo context cho xác thực
const AuthContext = createContext();

// Provider cho AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Đăng ký người dùng mới
  const signup = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/users/signup", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  // Xác minh mã
  const verifyCode = async (email, code) => {
    try {
      const response = await axios.post("http://localhost:5000/users/verify", {
        email,
        code,
      });
      return { success: response.data };
    } catch (error) {
      throw error.response.data;
    }
  };

  // Đặt lại mật khẩu
  const resetPassword = async (email, newPassword) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/reset-password",
        { email, newPassword }
      );
      return { success: response.data };
    } catch (error) {
      throw error.response.data;
    }
  };

  // Đăng nhập
  const login = async (email, password) => {
    try {
      // Kiểm tra xem email có phải là email của admin không
      if (email.endsWith("@example.com")) {
        try {
          const adminResponse = await axios.post(
            "http://localhost:5000/admin/login",
            { email, password }
          );

          // Nếu đăng nhập admin thành công
          if (adminResponse.data && adminResponse.data.role === "admin") {
            const { token, role, userId } = adminResponse.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", userId);
            setUser({ token, role, userId });
            navigate("/admin-dashboard");
            return adminResponse.data;
          }
        } catch (adminError) {
          // Nếu đăng nhập admin thất bại, bỏ qua và không hiển thị lỗi
          console.log("Not an admin, trying user login...");
        }
      }

      // Gọi API đăng nhập user
      const userResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );

      // Kiểm tra xem phản hồi từ API có hợp lệ không
      if (!userResponse.data || !userResponse.data.token) {
        throw new Error("Invalid response from server");
      }

      const { token, role, userId } = userResponse.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      setUser({ token, role, userId });

      // Điều hướng dựa trên vai trò
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/menu");
      }

      return userResponse.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Login failed. Please try again." }
      );
    }
  };

  const logout = () => {
    const confirmLogout = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất không?"
    );
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role"); // Xóa role khi đăng xuất
      setUser(null);
      navigate("/signin");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, verifyCode, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
