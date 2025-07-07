// NotificationDropdown.jsx (hoặc trên cùng file)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleDetailGroup } from "../../controller/GroupController";
import { Users, BellRing } from "lucide-react";

const NotificationDropdown = ({
  notificationList,
  setNotificationList,
  setNotificationCount,
  loadMore,
  hasMore,
}) => {
  console.log(notificationList);
  const navigate = useNavigate();
  const [groupTeacherMap, setGroupTeacherMap] = useState({});

  useEffect(() => {
    const fetchTeacherNames = async () => {
      const studyGroupIds = notificationList
        .filter((n) => n.studyGroupId)
        .map((n) => n.studyGroupId);
      const uniqueIds = [...new Set(studyGroupIds)];
      const newIds = uniqueIds.filter((id) => !groupTeacherMap[id]);

      if (!newIds.length) return;

      try {
        const results = await Promise.all(
          newIds.map(async (id) => {
            const res = await handleDetailGroup(id);
            return { id, userName: res?.data?.userName || "GV" };
          })
        );

        setGroupTeacherMap((prev) => ({
          ...prev,
          ...Object.fromEntries(
            results.map(({ id, userName }) => [id, userName])
          ),
        }));
      } catch (err) {
        console.error("Lỗi lấy thông tin nhóm:", err);
      }
    };

    fetchTeacherNames();
  }, [notificationList]);

  const handleNotificationClick = (item) => {
    const isGroup = !!item.studyGroupId;
    const link = isGroup
      ? `/sinh-vien/group-study/${item.studyGroupId}`
      : `/sinh-vien/notification/${item.id}`;
    navigate(link);

    setNotificationList((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };
  const isToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };
  const todayNotifications = notificationList.filter((n) =>
    isToday(n.createdAt)
  );
  const olderNotifications = notificationList.filter(
    (n) => !isToday(n.createdAt)
  );
  const renderNotificationItem = (item) => {
    const isGroup = !!item.studyGroupId;
    const typeIcon = isGroup ? <Users size={15} /> : <BellRing size={15} />;
    const getInitials = (name) => {
      if (!name) return "";
      const parts = name.trim().split(" ");
      return parts.length === 1
        ? parts[0][0].toUpperCase()
        : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
      <div
        key={item.id || item.content}
        onClick={() => handleNotificationClick(item)}
        // className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition group mb-1 rounded-md
        //   ${
        //     item.isRead === 0
        //       ? "bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100"
        //       : "hover:bg-gray-50"
        //   }
        // `}
        className="flex items-start gap-3 px-4 py-3 cursor-pointer transition group mb-1 rounded-md hover:bg-gray-100"
      >
        {/* Avatar */}
        {isGroup ? (
          <Avatar className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-transform hover:scale-105">
            <AvatarFallback className="bg-blue-500 text-white text-base font-semibold flex items-center justify-center">
              {getInitials(groupTeacherMap[item.studyGroupId])}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-transform hover:scale-105">
            <AvatarImage
              src="/img/logo.png"
              alt="Logo"
              className="object-contain w-full h-full scale-150"
            />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-base font-semibold flex items-center justify-center">
              LOGO
            </AvatarFallback>
          </Avatar>
        )}

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold line-clamp-2 flex items-center gap-1 text-sm text-gray-900">
              {item.title || item.content?.slice(0, 50)}
              <span className="text-xl">{typeIcon}</span>
            </span>
            {item.isRead === 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            )}
          </div>

          {item.type === "ChungToanTruong" ? (
            <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">
              Thông báo chung
            </span>
          ) : item.studyGroupName ? (
            <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-green-100 text-green-700">
              {item.studyGroupName}
            </span>
          ) : item.departmentName ? (
            <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-purple-100 text-purple-700">
              {item.departmentName}
            </span>
          ) : (
            <span className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              Tự động
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-h-96 w-92 bg-white rounded-2xl shadow-2xl overflow-y-auto border border-gray-200">
      {notificationList.length === 0 ? (
        <div className="p-6 w-80 text-center text-gray-400">
          <p>Không có thông báo nào</p>
        </div>
      ) : (
        <>
          {todayNotifications.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 sticky top-0 z-10">
                Mới nhất
              </div>
              {todayNotifications.map(renderNotificationItem)}
            </>
          )}

          {olderNotifications.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 sticky top-0 z-10">
                Trước đó
              </div>
              {olderNotifications.map(renderNotificationItem)}
            </>
          )}
        </>
      )}

      {hasMore && (
        <div className="text-center py-2">
          <button
            className="border border-blue-500 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 text-sm transition"
            onClick={loadMore}
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
