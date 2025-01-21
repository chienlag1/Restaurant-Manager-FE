import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouterNotLogin = ({ Page }) => {
  const isLogin = useSelector((state) => state.auth.isLoggedIn); // Lấy trạng thái đăng nhập từ Redux Store

  if (isLogin) {
    return <Navigate to="/" />; // Chuyển hướng nếu đã đăng nhập
  }

  return <Page />; // Hiển thị component nếu chưa đăng nhập
};

export default PrivateRouterNotLogin;
