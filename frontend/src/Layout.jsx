import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-scren flex">
      <div className="h-full w-[15%]">
        <Navbar />
      </div>
      <div className="w-[85%] h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
