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
const SidebarAdmin = () => {
  const { logout } = useAuth();
  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333" toggled={false}>
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
              <NavLink to="/admin-dashboard" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/admin-profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/admin-table" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">
                  Quản Lí Bàn Ăn
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/analytics" activeClassName="activeClicked">
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
            <Footer />
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default SidebarAdmin;
