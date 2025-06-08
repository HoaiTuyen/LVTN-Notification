import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Drawer, Grid, Dropdown } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
import { toast } from "react-toastify";

import Student from "../Admin/Student/Student";
import Group from "../Admin/Group/Group";
import Department from "../Admin/Department/Department";
import ClassRoom from "../Admin/ClassRoom/ClassRoom";
import Account from "../Admin/Account/Account";
import Lecturer from "../Admin/Lecturer/Lecturer";
import Subject from "../Admin/Subject/Subject";
import { handleLogout } from "../../controller/AuthController";
import { LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
  });
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleLogoutUser = () => {
    handleLogout(navigate);
    toast.success("Đăng xuất thành công");
  };

  const items = [
    { key: "home", icon: <HomeOutlined />, label: "Trang chủ" },
    {
      key: "account",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
    },
    {
      key: "department",
      icon: <img src="/img/menu/department.png" alt="icon" width={16} />,
      label: "Quản lý khoa",
    },
    {
      key: "class",
      icon: <img src="/img/menu/class.png" alt="icon" width={16} />,
      label: "Quản lý lớp",
    },
    {
      key: "subject",
      icon: <BookOutlined />,
      label: "Quản lý môn học",
    },
    {
      key: "notificationGroup",
      icon: <NotificationOutlined />,
      label: "Quản lý thông báo nhóm học tập",
      title: "Quản lý thông báo nhóm học tập",
    },
    {
      key: "group",
      icon: <TeamOutlined />,
      label: "Quản lý  nhóm học tập",
    },
    {
      key: "notification",
      icon: <img src="/img/menu/notification.png" alt="icon" width={16} />,
      label: "Quản lý  thông báo",
    },
    {
      key: "student",
      icon: <img src="/img/menu/student.png" alt="icon" width={16} />,
      label: "Quản lý  sinh viên",
    },
    {
      key: "lecturer",
      icon: <img src="/img/menu/lecturer.png" alt="icon" width={16} />,
      label: "Quản lý  giảng viên",
    },
    {
      key: "registerClass",
      icon: <img src="/img/menu/notification.png" alt="icon" width={16} />,
      label: "Quản lý  đăng ký lớp học phần",
      title: "Quản lý đăng ký lớp học phần",
    },
    {
      key: "setting",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
  ];

  const SidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedTab]}
      onClick={(e) => {
        setSelectedTab(e.key);
        setDrawerVisible(false);
      }}
      items={items}
      style={{ height: "100%", borderRight: "1px solid #e5e7eb" }}
    />
  );

  return (
    <Layout style={{ minHeight: "150vh", width: "100vw" }}>
      <Header
        style={{
          backgroundColor: "#fff",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <div className="sm:w-full sm:max-w-sm">
          <img
            className="h-10 w-auto"
            src="/img/logo1.png"
            alt="Your Company"
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isMobile && (
            <Button
              icon={<MenuUnfoldOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          )}

          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    key: "userInfo",
                    label: (
                      <div style={{ padding: "", textAlign: "start" }}>
                        <div style={{ fontWeight: "bold" }}>
                          {userInfo.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          {userInfo.email}
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "settings",
                    label: "Cài đặt",
                    icon: <SettingOutlined />,
                  },
                  {
                    key: "logout",
                    label: "Đăng xuất",
                    icon: <LogOut size={16} />,
                    style: { color: "red", fontWeight: "bold" },
                  },
                ]}
                onClick={(e) => {
                  if (e.key === "logout") handleLogoutUser();
                }}
              />
            }
            trigger={["click"]}
          >
            <div style={{ cursor: "pointer", paddingRight: "25px" }}>
              <Avatar icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        {!isMobile && (
          <Sider width={250} theme="light" style={{ height: "100vh" }}>
            {SidebarMenu}
          </Sider>
        )}

        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
          style={{ height: "100vh" }}
        >
          {SidebarMenu}
        </Drawer>

        {/* NỘI DUNG */}
        <Content
          style={{
            padding: 0,
            height: "100%",
            overflow: "auto",
          }}
        >
          {selectedTab === "student" && <Student />}
          {selectedTab === "group" && <Group />}
          {selectedTab === "department" && <Department />}
          {selectedTab === "class" && <ClassRoom />}
          {selectedTab === "account" && <Account />}
          {selectedTab === "lecturer" && <Lecturer />}
          {selectedTab === "subject" && <Subject />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
