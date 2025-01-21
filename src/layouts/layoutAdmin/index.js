import React from "react";
import SidebarAdmin from "../sidebarAdmin";
const LayoutAdmin = ({ Page }) => {
  return (
    <div className="bg-[#E3D9C7] flex flex-row">
      <SidebarAdmin />
      <div className="w-full h-full bg-site bg-no-repeat bg-cover overflow-hidden">
        <div className="h-screen">
          <Page />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
