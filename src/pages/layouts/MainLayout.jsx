import React from "react";
import { Layout, theme } from "antd";
import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  return (
    <Layout>
      <Navbar />
      <div>
        <Layout>
          {/* <SideBar/> */}
          <Outlet />
        </Layout>
      </div>
    </Layout>
  );
};

export default MainLayout;
