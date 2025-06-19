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
import { Dropdown as AntdDropdown } from "antd";

import { Bell, User, LogOut, Group } from "lucide-react";
import { jwtDecode } from "jwt-decode";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

import { handleGetDetailUser } from "../../controller/AccountController";
import { handleTeacherDetail } from "../../controller/TeacherController";
import { handleStudentDetail } from "../../controller/StudentController";
const Student = () => {
  const { stompClient, connected, error } = useWebSocket();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  console.log(notificationList);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (connected && stompClient.current && userInfo && userInfo.departmentId) {
      console.log("✅ WebSocket is connected in Student component");

      // Đăng ký nhận tin nhắn từ server
      stompClient.current.subscribe("/notification", (message) => {
        console.log(message);
        const parsedMessage = JSON.parse(message.body);
        setNotificationList((prev) => [parsedMessage, ...prev]);
        setNotificationCount((prev) => prev + 1);
        // console.log("Received message:", JSON.parse(message.body));
      });
      // const departmentTopic = `/notification/department/${departmentId}`
      const departmentTopic = `/notification/department/${userInfo.departmentId}`;
      console.log(departmentTopic);
      stompClient.current.subscribe(departmentTopic, (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log("Received department notification:", parsedMessage);
        setNotificationList((prev) => [parsedMessage, ...prev]);

        setNotificationCount((prev) => prev + 1);
      });
    }
  }, [connected, stompClient, userInfo.departmentId]);
  const [selectedTab, setSelectedTab] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
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
        if (req.data.studentId) {
          const detailStudent = await handleStudentDetail(req.data.studentId);
          setUserInfo(detailStudent.data);
        } else if (req.data.teacherId) {
          const detailTeacher = await handleStudentDetail(req.data.teacherId);
          setUserInfo(detailTeacher.data);
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
  // const notificationDropdownItems = notificationList
  //   .slice(0, 5)
  //   .map((item, index) => ({
  //     key: item.id || index,
  //     label: (
  //       <div
  //         onClick={() => navigate(`/sinh-vien/notification/${item.id}`)}
  //         style={{ padding: "8px 12px", cursor: "pointer" }}
  //       >
  //         <div style={{ fontWeight: 500 }}>{item.title}</div>
  //         <div style={{ fontSize: "12px", color: "#888" }}>
  //           {item?.createdAt?.slice(0, 10)}
  //         </div>
  //       </div>
  //     ),
  //   }));
  const NotificationDropdown = () => {
    if (notificationList.length === 0) {
      return (
        <div style={{ padding: 16, width: 320 }}>
          <p>Không có thông báo nào.</p>
        </div>
      );
    }

    return (
      <div style={{ maxHeight: 400, overflowY: "auto", width: 360 }}>
        {notificationList.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/sinh-vien/notification/${item.id}`)}
            style={{
              display: "flex",
              padding: 12,
              gap: 12,
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9f9f9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#fff")
            }
          >
            <img
              src="/img/logo.png"
              alt="thumb"
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#3b82f6",
                  backgroundColor: "#e0f2fe",
                  borderRadius: 12,
                  border: "1px solid #bfdbfe",
                  marginBottom: 4,
                }}
              >
                {item.notificationType}
              </span>

              <div style={{ fontSize: 12, color: "#888" }}>
                {item.createdAt}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
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
    {
      key: "groupStudy",
      icon: <Group size={16} />,
      label: "Nhóm học tập",
    },
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
          {/* <div className="relative inline-block cursor-pointer">
            <Bell className="text-gray-800" size={25} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </div> */}
          <Dropdown
            overlay={<NotificationDropdown />}
            trigger={["hover"]}
            placement="bottomRight"
            overlayStyle={{
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              zIndex: 999,
            }}
          >
            <div className="relative inline-block cursor-pointer">
              <Bell className="text-gray-800" size={25} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </div>
          </Dropdown>

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
          style={{ height: "100vh", backgroundColor: "#fff" }}
        >
          {SidebarMenu}
        </Drawer>

        {/* NỘI DUNG */}
        <Content
          style={{
            padding: 0,

            overflow: "auto",
            backgroundColor: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Student;
