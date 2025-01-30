import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import Footer from "../footer";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const SidebarUser = () => {
  const { logout } = useAuth();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "auto",
        overflow: "auto",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Restaurant
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "activeClicked" : "")}
            >
              <CDBSidebarMenuItem icon="columns">User</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "activeClicked" : "")}
            >
              <CDBSidebarMenuItem icon="table">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/tables"
              className={({ isActive }) => (isActive ? "activeClicked" : "")}
            >
              <CDBSidebarMenuItem icon="user">Đặt bàn</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) => (isActive ? "activeClicked" : "")}
            >
              <CDBSidebarMenuItem icon="chart-line">
                Thống Kê
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <Button variant="danger" onClick={logout} style={{ width: "100%" }}>
            Logout
          </Button>

          <div style={{ padding: "20px 5px" }}>
            <Footer />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SidebarUser;
