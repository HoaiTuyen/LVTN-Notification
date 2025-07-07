// NotificationDropdown.jsx (hoặc trên cùng file)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleDetailGroup } from "../../controller/GroupController";
import { Users, BellRing } from "lucide-react";
import dayjs from "dayjs";
import isTodayPlugin from "dayjs/plugin/isToday";
dayjs.extend(isTodayPlugin);
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
      const groupIds = notificationList
        .filter((n) => n.groupId)
        .map((n) => n.groupId);

      const uniqueIds = [...new Set(groupIds)];
      console.log(uniqueIds);
      const newIds = uniqueIds.filter((id) => !groupTeacherMap[id]);
      if (!newIds.length) return;

      try {
        const results = await Promise.all(
          newIds.map(async (id) => {
            const res = await handleDetailGroup(id);
            console.log(res);
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
    const groupId = !!item.groupId;
    const link = groupId
      ? `/sinh-vien/group-study/${item.groupId}`
      : `/sinh-vien/notification/${item.id}`;
    navigate(link);

    setNotificationList((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    setNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const sortedList = [...notificationList].sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
  );

  const latestNotifications = sortedList.slice(0, 3);
  const latestIds = latestNotifications.map((n) => n.id);
  const olderNotifications = sortedList.filter(
    (n) => !latestIds.includes(n.id)
  );

  const renderNotificationItem = (item) => {
    const groupId = !!item.groupId;
    console.log(item.groupId);
    const typeIcon = groupId ? <Users size={15} /> : <BellRing size={15} />;
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
        className="flex items-start gap-3 px-4 py-3 cursor-pointer transition group mb-1 rounded-md hover:bg-gray-100"
      >
        {/* Avatar */}
        {groupId ? (
          <Avatar className="w-12 h-12 rounded-full bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-transform hover:scale-105">
            <AvatarFallback className="bg-blue-500 text-white text-base font-semibold flex items-center justify-center">
              {getInitials(groupTeacherMap[item.groupId])}
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
            <span className="font-semibold flex items-center gap-1 text-sm text-gray-900 line-clamp-2 overflow-hidden text-ellipsis">
              <span className="block max-w-[200px] truncate">
                {item.title || item.content?.slice(0, 50)}
              </span>
              <span className="text-xl shrink-0">{typeIcon}</span>
            </span>
            {!item?.isRead && (
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-1">
            {item.notificationType && (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-slate-200	text-slate-800">
                {item.notificationType}
              </span>
            )}

            {item.departmentName && (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                {item.departmentName}
              </span>
            )}
            {item.groupName && (
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                {item.groupName}
              </span>
            )}

            {!item.notificationType &&
              !item.departmentName &&
              !item.groupName && (
                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  Phòng đào tạo
                </span>
              )}
          </div>
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
          {latestNotifications.length > 0 && (
            <>
              <div className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 sticky top-0 z-10">
                Mới nhất
              </div>
              {latestNotifications.map(renderNotificationItem)}
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
