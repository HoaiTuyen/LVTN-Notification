import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Sheet, Send } from "lucide-react";
const { useBreakpoint } = Grid;
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { handleLogout } from "../../controller/AuthController";
import { LogOut } from "lucide-react";
import { handleGetDetailUser } from "../../controller/AccountController";
const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isStudentListPage = location.pathname.includes("/students");
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
      key: "semester",
      icon: <Sheet size={16} />,
      label: "Quản lý học kỳ",
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
      key: "notification-type",
      icon: <img src="/img/menu/notification.png" alt="icon" width={16} />,
      label: "Quản lý loại thông báo",
    },
    {
      key: "notification",
      icon: <Send size={16} />,
      label: "Quản lý  thông báo",
    },
    {
      key: "student-admin",
      icon: <img src="/img/menu/student.png" alt="icon" width={16} />,
      label: "Quản lý  sinh viên",
    },
    {
      key: "lecturer-admin",
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
  const handleLogoutUser = () => {
    handleLogout(navigate);
    toast.success("Đăng xuất thành công");
  };
  const fetchUserDetail = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found");
        return;
      }

      const data = jwtDecode(token);
      if (!data || !data.userId) {
        console.error("Invalid token or missing userId");
        return;
      }

      const req = await handleGetDetailUser(data.userId);
      if (req?.data) {
        const userData = req.data;
        setUserImage(userData.image);
        if (userData.student) {
          setUserInfo(userData.student);
        } else if (userData.teacher) {
          setUserInfo(userData.teacher);
        } else {
          console.error("No user data found in response");
        }
      } else {
        console.error("Invalid response from server:", req);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);
  const SidebarMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedTab]}
      onClick={(e) => {
        setSelectedTab(e.key);
        setDrawerVisible(false);
        navigate(`/admin/${e.key}`);
      }}
      items={items}
      style={{ height: "100%", borderRight: "1px solid #e5e7eb" }}
    />
  );

  return (
    <>
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
                <Avatar icon={<UserOutlined />} src={userImage} />
              </div>
            </Dropdown>
          </div>
        </Header>

        <Layout>
          {!isStudentListPage && !isMobile && (
            <Sider width={250} theme="light" style={{ height: "100vh" }}>
              {SidebarMenu}
            </Sider>
          )}

          {!isStudentListPage && (
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
          )}

          {/* NỘI DUNG */}
          <Content
            style={{
              padding: 0,
              height: "100%",
              overflow: "auto",
              width: isStudentListPage ? "100%" : "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
