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
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      // Lưu trữ thông tin người dùng
      setUser({
        username: response.data.username,
        id: response.data.userId,
        email: response.data.email,
        token: response.data.token,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  // Đăng xuất
  const logout = () => {
    alert("sign out sucessfully");
    setUser(null);
    navigate("/signin");
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
