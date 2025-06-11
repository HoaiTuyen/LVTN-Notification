import React, { useEffect, useState } from "react";
import useWebSocket from "../../config/Websorket";
import { handleLogout } from "@/controller/AuthController";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Drawer, Grid, Dropdown } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Bell, User, LogOut } from "lucide-react";
import { jwtDecode } from "jwt-decode";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
import { handleGetDetailUser } from "../../controller/AccountController";
const Student = () => {
  const { stompClient, connected, error } = useWebSocket();
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    if (connected && stompClient.current) {
      console.log("✅ WebSocket is connected in Student component");

      // Đăng ký nhận tin nhắn từ server
      stompClient.current.subscribe("/notification", (message) => {
        setNotificationCount((prev) => prev + 1);
        console.log("Received message:", JSON.parse(message.body));
      });
    }
  }, [connected, stompClient]);
  const [selectedTab, setSelectedTab] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // const [userInfo, setUserInfo] = useState({
  //   name: "Nguyễn Văn A",
  //   email: "nguyenvana@example.com",
  // });
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const handleLogoutUser = () => {
    handleLogout(navigate);
    toast.success("Đăng xuất thành công");
  };
  const fetchUserDetail = async () => {
    const token = localStorage.getItem("access_token");
    const data = jwtDecode(token);
    const req = await handleGetDetailUser(data.userId);
    if (req?.data) {
      const userData = req.data;

      if (userData.student) {
        setUserInfo(userData.student);
      } else if (userData.teacher) {
        setUserInfo(userData.teacher);
      } else {
        console.log("Lỗi");
      }
    }
  };
  const items = [
    { key: "home", icon: <HomeOutlined />, label: "Trang chủ" },
    {
      key: "profile",
      icon: <User size={16} />,
      label: "Thông tin cá nhân",
    },
    {
      key: "notification",
      icon: <Bell size={16} />,
      label: "Thông báo",
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
  const SidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedTab]}
      onClick={(e) => {
        setSelectedTab(e.key);
        setDrawerVisible(false);
        navigate(`/sinh-vien/${e.key}`);
      }}
      items={items}
      style={{ height: "100%", borderRight: "1px solid #e5e7eb" }}
    />
  );
  useEffect(() => {
    fetchUserDetail();
  }, []);
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
          <div className="relative inline-block cursor-pointer">
            <Bell className="text-gray-800" size={25} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </div>

          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    key: "userInfo",
                    label: (
                      <div style={{ padding: "", textAlign: "start" }}>
                        <div style={{ fontWeight: "bold" }}>
                          {userInfo.firstName} {userInfo.lastName}
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Student;
