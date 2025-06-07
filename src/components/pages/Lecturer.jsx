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
  BorderTopOutlined,
} from "@ant-design/icons";
import {
  BookOpen,
  Users,
  Bell,
  User,
  Key,
  LogOut,
  Home,
  MessageSquare,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
import { toast } from "react-toastify";

import { handleLogout } from "@/controller/AuthController";
import CreateNotification from "../Lecturer/creatNotification";
const LecturerDashboard = () => {
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
      key: "profile",
      icon: <User size={16} />,
      label: "Thông tin cá nhân",
    },
    {
      key: "subjectCharge",
      icon: <BookOpen size={16} />,
      label: "Môn học phụ trách",
    },
    {
      key: "classCharge",
      icon: <GraduationCap size={16} />,
      label: "Lớp học phụ trách",
    },
    {
      key: "groupClass",
      icon: <Users size={16} />,
      label: "Nhóm học tập",
    },
    {
      key: "notification",
      icon: <MessageSquare size={16} />,
      label: "Tạo thông báo",
      title: "",
    },
    {
      key: "sentNotification",
      icon: <Bell size={16} />,
      label: "Thông báo đã gửi",
    },
    // {
    //   key: "setting",
    //   icon: <SettingOutlined />,
    //   label: "Cài đặt",
    // },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogOut size={16} />,
      style: {
        color: "red",
        fontWeight: "bold",
        BorderTopOutlined: "1px solid #e5e7eb",
      },
    },
  ];
  // const menuItems = [
  //   {
  //     key: "settings",
  //     label: "Cài đặt",
  //     icon: <SettingOutlined />,
  //   },
  //   {
  //     key: "logout",
  //     label: "Đăng xuất",
  //     icon: <LogoutOutlined />,
  //   },
  // ];

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
          {/* <span style={{ fontWeight: "bold" }}>Chào, Admin</span> */}
          {/* <Dropdown
            overlay={
              <Menu
                items={menuItems}
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
          </Dropdown> */}
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
          {selectedTab === "notification" && <CreateNotification />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LecturerDashboard;
