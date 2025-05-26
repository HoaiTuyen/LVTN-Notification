import React, { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Button,
  Drawer,
  Grid,
  Dropdown,
  Space,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  ApartmentOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BookOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleLogout = () => {
    alert("Đang phát triển");
  };

  const items = [
    { key: "home", icon: <HomeOutlined />, label: "Trang chủ" },
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
      icon: <img src="/img/menu/notification.png" alt="icon" width={16} />,
      label: "Quản lý  sinh viên",
    },
    {
      key: "lecturer",
      icon: <img src="/img/menu/notification.png" alt="icon" width={16} />,
      label: "Quản lý  sinh viên",
    },
    {
      key: "lecturer",
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
  const menuItems = [
    {
      key: "settings",
      label: "Cài đặt",
      icon: <LockOutlined />,
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout, // Gọi hàm logout khi chọn
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
      style={{ height: "100%", borderRight: 0 }}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isMobile && (
            <Button
              icon={<MenuUnfoldOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          )}
          <span style={{ fontWeight: "bold" }}>Chào, Admin</span>
        </div>

        <Dropdown
          overlay={
            <Menu
              items={menuItems}
              onClick={(e) => {
                if (e.key === "logout") handleLogout();
              }}
            />
          }
          trigger={["click"]}
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
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
        ></Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
