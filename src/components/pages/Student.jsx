import React, { useEffect, useState, memo } from "react";
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

import {
  Bell,
  User,
  LogOut,
  Group,
  Users,
  BookOpen,
  BellRing,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

import { handleGetDetailUser } from "../../controller/AccountController";

import { handleStudentDetail } from "../../controller/StudentController";
import { handleListGroupByStudent } from "../../controller/AccountController";
import { handleDetailGroup } from "../../controller/GroupController";
import { handleListNotificationByStudent } from "../../controller/AccountController";
import NotificationDropdown from "./NotificationDropdown";
const Student = () => {
  const { stompClient, connected, error } = useWebSocket();
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);

  const [groupStudents, setGroupStudents] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [selectedTab, setSelectedTab] = useState("home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [apiNotificationList, setApiNotificationList] = useState([]);
  const [apiNotificationPage, setApiNotificationPage] = useState(0);
  const [hasMoreNotifications, setHasMoreNotifications] = useState(true);

  const fetchListGroupById = async () => {
    const req = await handleListGroupByStudent(userId);

    if (Array.isArray(req.data) && req.status === 200) {
      const groupIds = req.data.map((group) => group.groupId);
      setGroupStudents(groupIds); // mảng ID: [101, 102, 103, 104]
    }
  };
  useEffect(() => {
    fetchListGroupById();
  }, []);

  // useEffect(() => {
  //   let groupSubscriptions = [];
  //   if (connected && stompClient.current && userInfo && userInfo.departmentId) {
  //     // Đăng ký nhận tin nhắn từ server
  //     stompClient.current.subscribe("/notification", (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       setNotificationList((prev) => [parsedMessage, ...prev]);
  //       setNotificationCount((prev) => prev + 1);
  //     });
  //     //Gửi thông báo cho khoa
  //     const departmentTopic = `/notification/department/${userInfo.departmentId}`;
  //     stompClient.current.subscribe(departmentTopic, (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       setNotificationList((prev) => [parsedMessage, ...prev]);
  //       setNotificationCount((prev) => prev + 1);
  //     });
  //     //Gửi cho 1 sinh viên
  //     const studentMail = `/user/${userInfo.id}/notification`;

  //     stompClient.current.subscribe(studentMail, (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       console.log(parsedMessage);

  //       setNotificationList((prev) => [parsedMessage, ...prev]);
  //       setNotificationCount((prev) => prev + 1);
  //     });
  //     // Sub group:
  //     groupStudents.forEach((groupId) => {
  //       const groupTopic = `/notification/group/${groupId}`;
  //       const sub = stompClient.current.subscribe(groupTopic, (message) => {
  //         const parsedMessage = JSON.parse(message.body);
  //         setNotificationList((prev) => [parsedMessage, ...prev]);
  //         setNotificationCount((prev) => prev + 1);
  //       });
  //       groupSubscriptions.push(sub);
  //     });
  //   }
  //   return () => {
  //     // Unsubscribe group topics
  //     groupSubscriptions.forEach((sub) => {
  //       if (sub && typeof sub.unsubscribe === "function") sub.unsubscribe();
  //     });
  //   };
  // }, [
  //   connected,
  //   stompClient,
  //   userInfo.departmentId,
  //   JSON.stringify(groupStudents),
  // ]);
  useEffect(() => {
    let subscriptions = [];
    if (
      connected &&
      stompClient.current &&
      userInfo?.departmentId &&
      userInfo?.id
    ) {
      // Đăng ký các subscription
      const generalSub = stompClient.current.subscribe(
        "/notification",
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log(parsedMessage);

          setNotificationList((prev) => {
            if (prev.some((item) => item.id === parsedMessage.id)) return prev;
            return [{ ...parsedMessage, isRead: false }, ...prev];
          });
          setNotificationCount((prev) => prev + 1);
        }
      );

      const departmentSub = stompClient.current.subscribe(
        `/notification/department/${userInfo.departmentId}`,
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          setNotificationList((prev) => {
            if (prev.some((item) => item.id === parsedMessage.id)) return prev;
            return [{ ...parsedMessage, isRead: false }, ...prev];
          });
          setNotificationCount((prev) => prev + 1);
        }
      );

      const groupSubs = groupStudents.map((groupId) => {
        const groupTopic = `/notification/group/${groupId}`;
        const sub = stompClient.current.subscribe(groupTopic, (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log(
            `Received group notification for ${groupId}:`,
            parsedMessage
          );
          setNotificationList((prev) => {
            if (prev.some((item) => item.id === parsedMessage.id)) return prev;
            return [{ ...parsedMessage, isRead: false }, ...prev];
          });
          setNotificationCount((prev) => prev + 1);
        });
        return sub;
      });
      // const scheduleSub = stompClient.current.subscribe(
      //   "/user/queue/schedule",
      //   (message) => {
      //     console.log(message.body);
      //     const parsedMessage = JSON.stringify(message.body);
      //     console.log("Received schedule notification:", parsedMessage);
      //     setNotificationList((prev) => {
      //       console.log(prev);

      //       if (prev.some((item) => item.id === parsedMessage.id)) return prev;
      //       return [{ ...parsedMessage, isRead: false }, ...prev];
      //     });
      //     setNotificationCount((prev) => prev + 1);
      //   }
      // );

      const scheduleSub = stompClient.current.subscribe(
        "/user/queue/schedule",
        (message) => {
          console.log(message.body);
          const parsedMessage = {
            id: new Date().getTime(),
            title: message.body,
            isRead: false,
          };

          setNotificationList((prev) => {
            if (prev.some((item) => item.title === parsedMessage.title))
              return prev;
            return [parsedMessage, ...prev];
          });

          setNotificationCount((prev) => prev + 1);
        }
      );

      const personalSub = stompClient.current.subscribe(
        "/user/queue/personal",
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log("Received personal notification:", parsedMessage);
          setNotificationList((prev) => {
            if (prev.some((item) => item.id === parsedMessage.id)) return prev;
            return [{ ...parsedMessage, isRead: false }, ...prev];
          });
          setNotificationCount((prev) => prev + 1);
        }
      );

      subscriptions = [
        generalSub,
        departmentSub,

        scheduleSub,
        personalSub,
        ...groupSubs,
      ];
    }

    return () => {
      subscriptions.forEach((sub) => {
        if (sub && typeof sub.unsubscribe === "function") {
          sub.unsubscribe();
        }
      });
    };
  }, [
    connected,
    stompClient,
    userInfo.departmentId,
    userInfo.id,
    groupStudents,
  ]);

  const handleLogoutUser = () => {
    handleLogout(navigate);
    toast.success("Đăng xuất thành công");
  };
  useEffect(() => {
    // Cập nhật notificationCount dựa trên số thông báo chưa đọc
    setNotificationCount(notificationList.filter((n) => !n.isRead).length);
  }, [notificationList]);
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
      console.log(req);
      if (req?.data) {
        if (req.data.studentId) {
          setUserImage(req.data.image);
          const detailStudent = await handleStudentDetail(req.data.studentId);
          setUserInfo(detailStudent.data);
        } else {
          setUserInfo([]);
          console.error("No user data found in response");
        }
      } else {
        console.error("Invalid response from server:", req);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchInitialNotifications = async () => {
    try {
      const res = await handleListNotificationByStudent(userId, 0, 100);
      if (res?.data?.responses) {
        const notifications = res.data.responses;
        const unreadCount = notifications.filter((n) => !n.isRead).length;

        setNotificationList(notifications.slice(0, 5)); // hiển thị 5 đầu
        setNotificationCount(unreadCount);
        setApiNotificationPage(1);
        setHasMoreNotifications(res.data.totalPages > 1);
      }
    } catch (error) {
      console.error("Lỗi fetch thông báo:", error);
    }
  };

  const loadMoreNotifications = async () => {
    const nextPage = apiNotificationPage + 1;

    try {
      const res = await handleListNotificationByStudent(userId, nextPage, 5);

      if (res?.data?.responses?.length > 0) {
        setNotificationList((prev) => [
          ...prev,
          ...res.data.responses.filter(
            (newItem) => !prev.some((oldItem) => oldItem.id === newItem.id)
          ),
        ]);

        setApiNotificationPage(nextPage);
        setHasMoreNotifications(nextPage < res.data.totalPages);
      } else {
        setHasMoreNotifications(false);
      }
    } catch (err) {
      console.error("Lỗi load thêm thông báo:", err);
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
      key: "subject",
      icon: <BookOpen size={16} />,
      label: "Môn học của tôi",
    },
    {
      key: "notification",
      icon: <Bell size={16} />,
      label: "Thông báo",
    },
    {
      key: "group-study",
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
        if (e.key === "logout") {
          handleLogoutUser();
          return;
        }
        navigate(`/sinh-vien/${e.key}`);
      }}
      items={items}
      style={{ height: "100%", borderRight: "1px solid #e5e7eb" }}
    />
  );
  useEffect(() => {
    fetchUserDetail();
    fetchInitialNotifications();
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
          <Dropdown
            dropdownRender={() => (
              <NotificationDropdown
                notificationList={notificationList}
                setNotificationList={setNotificationList}
                setNotificationCount={setNotificationCount}
                loadMore={loadMoreNotifications}
                hasMore={hasMoreNotifications}
              />
            )}
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              zIndex: 999,
              backgroundColor: "#fff",
            }}
            onOpenChange={(open) => {
              if (open) {
                setNotificationCount(
                  notificationList.filter((n) => !n.isRead).length
                );
              }
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
              <Avatar className="w-10 h-10  shadow-sm ring-1 ring-gray-200">
                <AvatarImage src={userImage || "No image"} alt="Logo" />
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

// const NotificationDropdown = memo(
//   ({
//     notificationList,
//     setNotificationList,
//     setNotificationCount,
//     loadMore,
//     hasMore,
//   }) => {
//     const navigate = useNavigate();
//     const [groupTeacherMap, setGroupTeacherMap] = useState({});

//     useEffect(() => {
//       const fetchTeacherNames = async () => {
//         if (!notificationList?.length) return;

//         const studyGroupIds = notificationList
//           .filter((n) => n.studyGroupId)
//           .map((n) => n.studyGroupId);
//         const uniqueIds = [...new Set(studyGroupIds)];
//         const newIds = uniqueIds.filter((id) => !groupTeacherMap[id]);

//         if (!newIds.length) return;

//         try {
//           const results = await Promise.all(
//             newIds.map(async (id) => {
//               const res = await handleDetailGroup(id);
//               console.log(res);
//               return { id, userName: res?.data?.userName || "GV" };
//             })
//           );

//           setGroupTeacherMap((prev) => ({
//             ...prev,
//             ...Object.fromEntries(
//               results.map(({ id, userName }) => [id, userName])
//             ),
//           }));
//         } catch (err) {
//           console.error("Lỗi lấy thông tin nhóm:", err);
//         }
//       };

//       fetchTeacherNames();
//     }, [notificationList]);

//     const handleNotificationClick = (item) => {
//       const isGroup = !!item.studyGroupId;
//       const link = isGroup
//         ? `/sinh-vien/group-study/${item.studyGroupId}`
//         : `/sinh-vien/notification/${item.id}`;
//       navigate(link);

//       // Đánh dấu thông báo là đã đọc
//       setNotificationList((prev) =>
//         prev.map((notification) =>
//           notification.id === item.id
//             ? { ...notification, isRead: true }
//             : notification
//         )
//       );
//       setNotificationCount((prev) => Math.max(0, prev - 1)); // Giảm số đếm cho thông báo chưa đọc
//     };

//     if (!notificationList?.length) {
//       return (
//         <div className="p-6 w-80 text-center text-gray-400">
//           <p>Không có thông báo nào</p>
//         </div>
//       );
//     }

//     const groupNotifications = notificationList
//       .filter((n) => n.studyGroupId && !n.isRead)
//       .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
//       .slice(0, 5);

//     const generalNotifications = notificationList
//       .filter((n) => !n.studyGroupId && !n.isRead)
//       .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
//       .slice(0, 5);

//     const renderNotificationItem = (item) => {
//       const isGroup = !!item.studyGroupId;
//       const hasContentOnly = !item.title && item.content;

//       const typeIcon = isGroup ? <Users size={15} /> : <BellRing size={15} />;
//       const getInitials = (name) => {
//         if (!name) return "";
//         const parts = name.trim().split(" ");
//         if (parts.length === 1) return parts[0][0].toUpperCase();
//         return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//       };

//       // return (
//       //   <div
//       //     key={item.id || item.content} // dùng content làm key fallback nếu không có id
//       //     onClick={() => handleNotificationClick(item)}
//       //     className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition group"
//       //   >
//       //     {isGroup ? (
//       //       <Avatar className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-transform hover:scale-105">
//       //         <AvatarFallback className="bg-blue-500 text-white text-base font-semibold flex items-center justify-center">
//       //           {getInitials(groupTeacherMap[item.studyGroupId])}
//       //         </AvatarFallback>
//       //       </Avatar>
//       //     ) : (
//       //       <Avatar className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-transform hover:scale-105">
//       //         <AvatarImage
//       //           src="/img/logo.png"
//       //           alt="Logo"
//       //           className="object-contain w-full h-full scale-150"
//       //         />
//       //         <AvatarFallback className="bg-blue-100 text-blue-800 text-base font-semibold flex items-center justify-center">
//       //           LOGO
//       //         </AvatarFallback>
//       //       </Avatar>
//       //     )}

//       //     <div className="flex-1 min-w-0">
//       //       <div className="flex items-center gap-2">
//       //         <span className="font-semibold line-clamp-2 flex items-center gap-1 text-sm text-gray-900">
//       //           {item.title || item.content?.slice(0, 50)}
//       //           <span className="text-xl">{typeIcon}</span>
//       //         </span>
//       //       </div>

//       //       {isGroup ? (
//       //         <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-green-100 text-green-700">
//       //           {item.studyGroupName}
//       //         </span>
//       //       ) : item.notificationType || item.departmentName ? (
//       //         <div className="flex flex-wrap gap-1 mt-1">
//       //           {item.notificationType && (
//       //             <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">
//       //               {item.notificationType}
//       //             </span>
//       //           )}
//       //           {item.departmentName && (
//       //             <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-purple-100 text-purple-700">
//       //               {item.departmentName}
//       //             </span>
//       //           )}
//       //         </div>
//       //       ) : hasContentOnly ? (
//       //         <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700">
//       //           Tự động
//       //         </span>
//       //       ) : null}
//       //     </div>
//       //   </div>
//       // );
//       return (
//         <div className="max-h-[400px] w-92 bg-white rounded-2xl shadow-2xl overflow-y-auto border border-gray-200">
//           {notificationList.length > 0 ? (
//             <>
//               {notificationList.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => handleNotificationClick(item)}
//                   className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition group ${
//                     item.isRead === 0
//                       ? "bg-gray-50 border-l-4 border-blue-500"
//                       : ""
//                   }`}
//                 >
//                   <Avatar className="w-10 h-10 shadow ring ring-gray-200">
//                     <AvatarFallback className="bg-blue-500 text-white">
//                       {item.type?.slice(0, 2)?.toUpperCase() || "TB"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="text-sm font-semibold text-gray-900">
//                       {item.title || "Không có tiêu đề"}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {new Date(item.createdAt).toLocaleString()}
//                     </div>
//                   </div>
//                   {item.isRead === 0 && (
//                     <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
//                   )}
//                 </div>
//               ))}

//               {hasMore && (
//                 <div className="text-center py-2">
//                   <button
//                     className="text-blue-600 hover:underline text-sm"
//                     onClick={loadMore}
//                   >
//                     Xem thêm
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="p-6 text-center text-gray-400">
//               Không có thông báo nào
//             </div>
//           )}
//         </div>
//       );
//     };

//     return (
//       <div className="max-h-96 w-92 bg-white rounded-2xl shadow-2xl overflow-y-auto border border-gray-200">
//         {groupNotifications.length > 0 && (
//           <>
//             <div className="text-lg font-bold px-4 pt-3 pb-1 text-black-400">
//               Nhóm học tập
//             </div>
//             <div>{groupNotifications.map(renderNotificationItem)}</div>
//           </>
//         )}
//         {generalNotifications.length > 0 && (
//           <>
//             <div className="text-lg font-bold px-4 pt-3 pb-1 text-black-400">
//               Thông báo chung
//             </div>
//             <div>{generalNotifications.map(renderNotificationItem)}</div>
//           </>
//         )}
//         {(groupNotifications.length > 0 || generalNotifications.length > 0) &&
//           hasMore && (
//             <div className="text-center py-2">
//               <button
//                 className="text-blue-600 hover:underline text-sm"
//                 onClick={loadMore}
//               >
//                 Xem thêm
//               </button>
//             </div>
//           )}
//         {groupNotifications.length === 0 &&
//           generalNotifications.length === 0 && (
//             <div className="p-6 w-80 text-center text-gray-400">
//               <p>Không có thông báo chưa đọc</p>
//             </div>
//           )}
//       </div>
//     );
//   }
// );
