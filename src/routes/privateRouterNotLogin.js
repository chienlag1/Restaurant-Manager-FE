import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ requiredRole }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />; // Chưa đăng nhập, quay về login
  }

  if (role !== requiredRole) {
    return <Navigate to="/" replace />; // Không có quyền, về trang chính
  }

  return <Outlet />; // Cho phép vào trang
};

export default PrivateRoute;
