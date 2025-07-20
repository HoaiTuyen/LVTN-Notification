import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  MoreVertical,
  NotepadText,
  Send,
  Copy,
  Ellipsis,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { handleDetailGroup } from "../../../controller/GroupController";
import { gradientBackgroundFromString } from "../../../config/color";
// import LecturerCreateGroupNotification from "./NotificationGroup/CreateNotification";
import {
  handleListNotificationGroup,
  handleDetailNotificationGroup,
} from "../../../controller/NotificationGroupController";
import dayjs from "dayjs";
import useWebSocket from "@/config/Websorket";

const DetailGroupStudent = () => {
  const { connected } = useWebSocket();

  useEffect(() => {
    if (connected) {
      console.log("Kết nối WebSocket thành công!");
    }
  }, [connected]);
  const location = useLocation();
  const navigate = useNavigate();
  const { groupStudyId } = useParams();

  const [groupDetail, setGroupDetail] = useState({});
  const [members, setMembers] = useState([]);
  const [notificationGroups, setNotificationGroups] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const backUrl = location.state?.from || "/sinh-vien/group-study";
  const fetchDetailGroup = async () => {
    setLoadingPage(true);
    const detailGroup = await handleDetailGroup(realId);

    if (detailGroup?.data && detailGroup.status === 200) {
      setGroupDetail(detailGroup.data);
      setMembers(detailGroup.data.members);
      setAuthorized(true);
    } else {
      toast.error(detailGroup.message);
      navigate(backUrl);
    }
    setLoadingPage(false);
  };
  const fetchListNotificationGroup = async () => {
    setLoadingPage(true);
    const listNotificationGroup = await handleListNotificationGroup(
      groupStudyId
    );
    setLoadingPage(false);
    if (listNotificationGroup?.data || listNotificationGroup?.status === 200) {
      const sorted = [...listNotificationGroup.data].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setNotificationGroups(sorted);
    } else {
      setNotificationGroups([]);
    }
  };
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  useEffect(() => {
    fetchDetailGroup();
  }, []);
  useEffect(() => {
    if (authorized) {
      fetchListNotificationGroup();
      const handleRefresh = () => {
        fetchListNotificationGroup();
      };
      window.addEventListener("notification-sent", handleRefresh);
      return () => {
        window.removeEventListener("notification-sent", handleRefresh);
      };
    }
  }, [authorized]);
  if (loadingPage) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authorized) return null;
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-gray-50 border-t border-gray-200 rounded-b-xl "
    >
      <div className="min-h-screen w-full bg-white p-10 overflow-y-auto max-h-screen pb-24">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => navigate(backUrl)}
              >
                <div className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="min-h-screen ">
          <Tabs defaultValue="home" className="px-6 pt-8 pb-3">
            <TabsList>
              <TabsTrigger
                value="home"
                className="data-[state=active]:text-blue-600 cursor-pointer"
              >
                Bảng tin
              </TabsTrigger>

              <TabsTrigger value="member" className="cursor-pointer">
                Mọi người
              </TabsTrigger>
            </TabsList>
            <TabsContent value="home">
              <div
                className=" text-white p-6 flex justify-between items-start h-[240px]  rounded-2xl"
                style={{
                  background: gradientBackgroundFromString(
                    groupDetail.id || ""
                  ),
                }}
              >
                <div>
                  <h1 className="text-3xl font-bold">{groupDetail.name}</h1>
                  <p className="text-lg">{groupDetail.userName}</p>
                </div>
                {/* <button className="bg-white text-black rounded px-3 py-1 text-sm font-medium shadow">
                    Customize
                  </button> */}
              </div>
              <div className="flex gap-4 mt-6">
                {/* Class code */}
                <div className="w-[200px] p-4 bg-gradient-to-br from-blue-100 to-blue-50 border rounded-xl shadow-sm h-fit shrink-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <CalendarDays className="text-blue-600 w-5 h-5" />
                    <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                      Ngày tạo lớp
                    </h3>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">
                    {dayjs(groupDetail.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>

                {/* Announcement + Activity */}
                <div className="flex-1 space-y-4">
                  {notificationGroups.length === 0 ? (
                    <></>
                  ) : (
                    notificationGroups.map((notify, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded-xl shadow-sm overflow-hidden cursor-pointer"
                      >
                        {/* Header */}
                        {/* <div className="p-4 flex space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-500 text-white">
                                {getInitials(groupDetail.userName) ||
                                  groupDetail.image}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">
                                {groupDetail.userName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(notify.createdAt).format("DD [thg] M")}
                              </p>
                              <div className="mt-2 space-y-1">
                                <p className="text-base font-semibold text-gray-800">
                                  {notify.title}
                                </p>
                                {notify.content && (
                                  <p className="text-sm text-gray-600 whitespace-pre-line">
                                    {notify.content}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-gray-400 cursor-pointer">
                              <MoreVertical size={16} />
                            </div>
                          </div> */}
                        <div className="p-4">
                          {/* Header row: Avatar + name + date */}
                          <div className="flex items-start space-x-3 mb-2">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-500 text-white">
                                {getInitials(groupDetail.userName) ||
                                  groupDetail.image}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">
                                {groupDetail.userName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Đã đăng vào ngày{" "}
                                {dayjs(notify.createdAt).format("DD [thg] M")}
                              </p>
                            </div>
                            {/* <div className="text-gray-400 cursor-pointer">
                                <MoreVertical size={16} />
                              </div> */}
                          </div>

                          {/* Title + Content full width, sát trái */}
                          <div className="space-y-1">
                            <p className="text-base font-semibold text-gray-800">
                              {notify.title}
                            </p>
                            {notify.content && (
                              <p className="text-sm text-gray-600 whitespace-pre-line">
                                {notify.content}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Files nếu có */}
                        {notify?.fileNotifications?.length > 0 && (
                          <div className="px-4 pb-4">
                            {notify.fileNotifications.map((file, idx) => (
                              <div
                                key={idx}
                                className="border rounded-lg p-3 mb-3 flex items-center space-x-4 hover:bg-gray-50 transition-colors"
                              >
                                <FileText className="text-blue-600" />
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {file.displayName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Tệp đính kèm
                                  </p>
                                </div>
                                <a
                                  href={file.fileName}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline text-sm"
                                >
                                  Tải xuống
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="member">
              <div className="max-w-3xl  py-8 px-4">
                {/* Tab Header */}

                {/* Teachers */}
                <div className="mb-6">
                  <h3 className="text-3xl font-medium mb-2">Giảng viên</h3>

                  <div
                    className="flex items-center space-x-3 py-2"
                    key={groupDetail.userName}
                  >
                    <Avatar>
                      <AvatarImage src="" alt={groupDetail.userName} />
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(groupDetail.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-md font-medium">
                      {groupDetail.userName}
                    </span>
                  </div>
                </div>

                {/* Classmates */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-3xl font-medium">Sinh viên</h3>
                    <span className="text-sm text-gray-500">
                      {members.length} sinh viên
                    </span>
                  </div>
                  <div className="divide-y">
                    {members.map((member) => (
                      <div
                        key={member.fullName}
                        className="flex items-center space-x-3 py-2"
                      >
                        <Avatar>
                          <AvatarFallback className="bg-gray-400 text-white">
                            {getInitials(member.fullName) || member.image}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.fullName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};
export default DetailGroupStudent;
