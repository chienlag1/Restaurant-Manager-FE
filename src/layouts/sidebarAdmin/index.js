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
const SidebarAdmin = () => {
  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
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
              <NavLink Link="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">
                  Trang Chủ Admin
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink Link="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink Link="/tables" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Đặt Bàn</CDBSidebarMenuItem>
              </NavLink>
              <NavLink Link="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">
                  Thống Kê
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              <Footer></Footer>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default SidebarAdmin;
