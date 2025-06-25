import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWebSocket from "../../config/Websorket";
import { handleLogout } from "@/controller/AuthController";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Grid, Dropdown } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Dropdown as AntdDropdown } from "antd";

import { Bell, User, LogOut, Group, Users } from "lucide-react";
import { jwtDecode } from "jwt-decode";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

import { handleGetDetailUser } from "../../controller/AccountController";
import { handleTeacherDetail } from "../../controller/TeacherController";
import { handleStudentDetail } from "../../controller/StudentController";
import { handleListGroupByStudent } from "../../controller/AccountController";
import { handleDetailGroup } from "../../controller/GroupController";
const Student = () => {
  const { stompClient, connected, error } = useWebSocket();
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;

  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const [groupTeacherMap, setGroupTeacherMap] = useState({});

  const [groupStudents, setGroupStudents] = useState([]);

  const [userInfo, setUserInfo] = useState([]);
  console.log(groupStudents);
  const fetchListGroupById = async () => {
    const req = await handleListGroupByStudent(userId);
    console.log(req);

    if (Array.isArray(req.data) && req.status === 200) {
      const groupIds = req.data.map((group) => group.groupId);
      setGroupStudents(groupIds); // mảng ID: [101, 102, 103, 104]
    }
  };
  // useEffect(() => {
  //   if (connected && stompClient.current && userInfo && userInfo.departmentId) {
  //     console.log("✅ WebSocket is connected in Student component");

  //     // Đăng ký nhận tin nhắn từ server
  //     stompClient.current.subscribe("/notification", (message) => {
  //       console.log(message);
  //       const parsedMessage = JSON.parse(message.body);
  //       setNotificationList((prev) => [parsedMessage, ...prev]);
  //       setNotificationCount((prev) => prev + 1);
  //       // console.log("Received message:", JSON.parse(message.body));
  //     });
  //     //Gửi thông báo cho khoa
  //     // const departmentTopic = `/notification/department/${departmentId}`
  //     const departmentTopic = `/notification/department/${userInfo.departmentId}`;
  //     console.log(departmentTopic);
  //     stompClient.current.subscribe(departmentTopic, (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       console.log("Received department notification:", parsedMessage);
  //       setNotificationList((prev) => [parsedMessage, ...prev]);

  //       setNotificationCount((prev) => prev + 1);
  //     });
  //     //Gửi cho 1 sinh viên
  //     const studentMail = `/user/${userInfo.id}/notification`;
  //     console.log(studentMail);
  //     stompClient.current.subscribe(studentMail, (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       console.log("Received department notification:", parsedMessage);
  //       setNotificationList((prev) => [parsedMessage, ...prev]);

  //       setNotificationCount((prev) => prev + 1);
  //     });
  //     groupStudents.forEach((groupId) => {
  //       const groupTopic = `/notification/group/${groupId}`;
  //       console.log("Subscribing to:", groupTopic);

  //       stompClient.current.subscribe(groupTopic, (message) => {
  //         const parsedMessage = JSON.parse(message.body);
  //         console.log("Received group notification:", parsedMessage);

  //         setNotificationList((prev) => [parsedMessage, ...prev]);
  //         setNotificationCount((prev) => prev + 1);
  //       });
  //     });
  //   }
  //   fetchListGroupById();
  // }, [connected, stompClient, userInfo.departmentId]);
  useEffect(() => {
    let groupSubscriptions = [];
    if (connected && stompClient.current && userInfo && userInfo.departmentId) {
      // ...Code subscribe cũ...
      console.log("✅ WebSocket is connected in Student component");

      // Đăng ký nhận tin nhắn từ server
      stompClient.current.subscribe("/notification", (message) => {
        console.log(message);
        const parsedMessage = JSON.parse(message.body);
        setNotificationList((prev) => [parsedMessage, ...prev]);
        setNotificationCount((prev) => prev + 1);
        // console.log("Received message:", JSON.parse(message.body));
      });
      //Gửi thông báo cho khoa
      // const departmentTopic = `/notification/department/${departmentId}`
      const departmentTopic = `/notification/department/${userInfo.departmentId}`;
      console.log(departmentTopic);
      stompClient.current.subscribe(departmentTopic, (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log("Received department notification:", parsedMessage);
        setNotificationList((prev) => [parsedMessage, ...prev]);

        setNotificationCount((prev) => prev + 1);
      });
      //Gửi cho 1 sinh viên
      const studentMail = `/user/${userInfo.id}/notification`;
      console.log(studentMail);
      stompClient.current.subscribe(studentMail, (message) => {
        const parsedMessage = JSON.parse(message.body);
        console.log("Received department notification:", parsedMessage);
        setNotificationList((prev) => [parsedMessage, ...prev]);

        setNotificationCount((prev) => prev + 1);
      });
      // Sub group:
      groupStudents.forEach((groupId) => {
        const groupTopic = `/notification/group/${groupId}`;
        const sub = stompClient.current.subscribe(groupTopic, (message) => {
          const parsedMessage = JSON.parse(message.body);
          setNotificationList((prev) => [parsedMessage, ...prev]);
          setNotificationCount((prev) => prev + 1);
        });
        groupSubscriptions.push(sub); // lưu lại sub instance
      });
    }
    fetchListGroupById(); // CLEANUP!

    return () => {
      // Unsubscribe group topics
      groupSubscriptions.forEach((sub) => {
        if (sub && typeof sub.unsubscribe === "function") sub.unsubscribe();
      });
    };
  }, [connected, stompClient, userInfo.departmentId, groupStudents]);
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

  const NotificationDropdown = ({ notificationList }) => {
    console.log(notificationList);

    const navigate = useNavigate();

    //const getRelativeTime = (dateStr) => {
    //   const diff = (new Date() - new Date(dateStr)) / 1000;
    //   if (diff < 60) return "Vừa xong";
    //   if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    //   if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    //   return `${Math.floor(diff / 86400)} ngày trước`;
    // };
    useEffect(() => {
      const fetchTeacherNames = async () => {
        const studyGroupIds = notificationList
          .filter((n) => n.studyGroupId)
          .map((n) => n.studyGroupId);

        const uniqueIds = [...new Set(studyGroupIds)];

        const results = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const res = await handleDetailGroup(id);
              return { id, userName: res?.data?.userName || "GV" };
            } catch (err) {
              console.error("Lỗi lấy thông tin nhóm:", err);
              return { id, userName: "GV" };
            }
          })
        );

        const map = {};
        results.forEach(({ id, userName }) => {
          map[id] = userName;
        });

        setGroupTeacherMap(map);
      };

      if (notificationList?.length) {
        fetchTeacherNames();
      }
    }, [notificationList]);
    if (!notificationList?.length) {
      return (
        <div className="p-6 w-80 text-center text-gray-400">
          <p>Không có thông báo nào </p>
        </div>
      );
    }

    const groupNotifications = notificationList
      .filter((n) => n.studyGroupId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const generalNotifications = notificationList
      .filter((n) => !n.studyGroupId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    const renderNotificationItem = (item) => {
      const isGroup = !!item.studyGroupId;
      const link = isGroup
        ? `/sinh-vien/groupStudy/${item.studyGroupId}`
        : `/sinh-vien/notification/${item.id}`;
      const typeIcon = isGroup ? <Users size={15} /> : <Bell size={15} />;
      const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      };

      return (
        <div
          key={item.id}
          onClick={() => navigate(link)}
          className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition group"
        >
          {isGroup ? (
            <Avatar className="w-12 h-12 rounded-full shadow-sm ring-1 ring-gray-200 bg-green-100">
              <AvatarFallback className="text-green-800 font-bold">
                {getInitials(item.teacherName)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="w-12 h-12 rounded-full shadow-sm ring-1 ring-gray-200 bg-blue-100">
              <AvatarImage src="/img/logo.png" alt="Logo" />
              <AvatarFallback className="text-blue-800 font-bold">
                LOGO
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold line-clamp-1 flex items-center gap-1">
                {item.title}
                <span className="text-xl">{typeIcon}</span>
              </span>
            </div>

            {/* Badge dưới title */}
            {isGroup ? (
              <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-green-100 text-green-700">
                {groupTeacherMap[item.studyGroupId] || item.studyGroupName}
              </span>
            ) : (
              item.notificationType && (
                <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  {item.notificationType}
                </span>
              )
            )}

            {/* <div className="text-xs text-gray-400 mt-1">
              {getRelativeTime(item.createdAt)}
            </div> */}
          </div>
        </div>
      );
    };

    return (
      <div className="max-h-96 w-92 bg-white rounded-2xl shadow-2xl overflow-y-auto border border-gray-200">
        {groupNotifications.length > 0 && (
          <>
            <div className="text-lg font-bold px-4 pt-3 pb-1 text-black-400">
              Nhóm học tập
            </div>
            <div>{groupNotifications.map(renderNotificationItem)}</div>
          </>
        )}
        {generalNotifications.length > 0 && (
          <>
            <div className="text-lg font-bold px-4 pt-3 pb-1 text-black-400">
              Thông báo chung
            </div>
            <div>{generalNotifications.map(renderNotificationItem)}</div>
          </>
        )}
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
            overlay={
              <NotificationDropdown notificationList={notificationList} />
            }
            // trigger={["hover"]}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              zIndex: 999,
              backgroundColor: "#fff",
            }}
            onOpenChange={() => {
              setNotificationCount(0);
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
              {/* <Avatar icon={<UserOutlined />} /> */}
              <Avatar className="w-12 h-12 rounded-lg shadow-sm ring-1 ring-gray-200">
                <AvatarImage src="" alt="Logo" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
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
