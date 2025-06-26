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
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { handleDetailGroup } from "../../../controller/GroupController";
import { gradientBackgroundFromString } from "../../../config/color";
import LecturerCreateGroupNotification from "./NotificationGroup/CreateNotification";
import {
  handleListNotificationGroup,
  handleDetailNotificationGroup,
} from "../../../controller/NotificationGroupController";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteNotificationGroup from "./NotificationGroup/DeleteNotificationGroup";
import UpdateNotificationGroup from "./NotificationGroup/UpdateNotificationGroup";
const DetailGroupLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [groupDetail, setGroupDetail] = useState({});
  const [members, setMembers] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectNotificationGroup, setSelectNotificationGroup] = useState(null);
  const [notificationGroups, setNotificationGroups] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const [expandedId, setExpandedId] = useState(null);
  const [detailNotify, setDetailNotify] = useState([]);

  const backUrl = location.state?.from || "/giang-vien/groupClass";
  const fetchDetailGroup = async () => {
    const detailGroup = await handleDetailGroup(groupId);

    if (detailGroup?.data && detailGroup.status === 200) {
      setGroupDetail(detailGroup.data);
      setMembers(detailGroup.data.members);
    }
  };
  const fetchListNotificationGroup = async () => {
    const listNotificationGroup = await handleListNotificationGroup(groupId);
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
  const handleToggleExpand = async (notificationGroup, e) => {
    e.stopPropagation();
    const isSame = expandedId === notificationGroup.id;

    if (isSame) {
      setExpandedId(null);
      setDetailNotify([]);
    } else {
      setIsLoadingDetail(true);
      const detail = await handleDetailNotificationGroup(notificationGroup.id);

      if (detail?.data) {
        setDetailNotify(detail.data);
        setExpandedId(notificationGroup.id);
      } else {
        setDetailNotify([]);
      }

      setIsLoadingDetail(false);
    }
  };

  useEffect(() => {
    fetchDetailGroup();
    fetchListNotificationGroup();
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden bg-gray-50 border-t border-gray-200 rounded-b-xl px-6 py-4"
    >
      <div className="min-h-screen w-full bg-white p-10 overflow-y-auto max-h-screen pb-24">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
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
                className="data-[state=active]:text-blue-600"
              >
                Bảng tin
              </TabsTrigger>
              <TabsTrigger value="notification">Thông báo</TabsTrigger>
              <TabsTrigger value="member">Mọi người</TabsTrigger>
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
                <div className="w-[150px] p-4 bg-white border rounded shadow-sm h-fit shrink-0">
                  <h3 className="text-sm text-gray-600 mb-1">Class Code</h3>
                  <div
                    className="flex text-xl font-mono text-blue-600 cursor-pointer items-center transition-transform active:scale-95"
                    onClick={() => {
                      navigator.clipboard.writeText(groupDetail.code);
                      toast.success("Đã sao chép");
                    }}
                  >
                    {groupDetail.code}
                    <div className="ml-2">
                      <Copy />
                    </div>
                  </div>
                </div>

                {/* Announcement + Activity */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white border rounded shadow-sm">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(groupDetail.userName) || groupDetail.image}
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="Thông báo gì đó đến lớp của bạn..."
                      className="flex-1"
                    />
                  </div>
                  {notificationGroups.length === 0 ? (
                    <></>
                  ) : (
                    notificationGroups.map((notify, index) => (
                      // <div
                      //   key={index}
                      //   className="p-4 bg-white border rounded shadow-sm"
                      // >
                      //   <div className="flex items-center space-x-2">
                      //     <div className="bg-pink-500 p-2 rounded-full text-white">
                      //       <NotepadText size={22} />
                      //     </div>
                      //     <div>
                      //       <p className="font-medium">
                      //         {groupDetail.userName} thông báo: {notify.title}
                      //       </p>
                      //       <p className="text-sm text-gray-500">
                      //         {dayjs(notify.createdAt).format("DD/MM/YYYY")}
                      //       </p>
                      //     </div>
                      //   </div>
                      // </div>

                      <div
                        key={index}
                        className="bg-white border rounded-xl shadow-sm overflow-hidden cursor-pointer"
                      >
                        {/* Header */}
                        <div className="p-4 flex space-x-3">
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
                            <p className="mt-2">{notify.title}</p>
                          </div>
                          <div className="text-gray-400 cursor-pointer">
                            <MoreVertical size={16} />
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

                        {/* Comment box */}
                        {/* <div className="border-t px-4 py-3 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white">
                            T
                          </div>
                          <input
                            type="text"
                            placeholder="Thêm nhận xét trong lớp học..."
                            className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none"
                          />
                          <button className="text-gray-400 hover:text-blue-600">
                            <Send size={18} />
                          </button>
                        </div> */}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notification">
              <div className="p-6  min-h-screen">
                {/* Nút Create */}
                <div className="mb-6 ">
                  <button
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white  py-3 px-6 rounded-full shadow-md text-lg flex items-center gap-2"
                    onClick={() => setOpenModalCreate(true)}
                  >
                    <span className="font-light">＋</span>
                    Create
                  </button>
                  {openModalCreate && (
                    <LecturerCreateGroupNotification
                      open={openModalCreate}
                      onClose={() => setOpenModalCreate(false)}
                      onSuccess={fetchListNotificationGroup}
                    />
                  )}
                </div>

                {/* Thẻ thông báo */}
                {notificationGroups.length === 0 ? (
                  <></>
                ) : (
                  notificationGroups.map((notificationGroup) => (
                    <motion.div
                      // layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      key={notificationGroup.id}
                      className="mb-4"
                    >
                      <div
                        key={notificationGroup.id}
                        className="bg-white shadow rounded-xl p-4 mb-4 flex items-center justify-between hover:border hover:border-gray-200 transition-all duration-100 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleExpand(notificationGroup, e);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <NotepadText size={22} />
                          </div>

                          {/* Nội dung */}
                          <div className="text-sm font-normal">
                            {notificationGroup.title}
                          </div>
                        </div>

                        {/* Ngày và menu */}
                        <div className="text-sm text-gray-500 flex items-center gap-4">
                          <span>
                            {dayjs(notificationGroup.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                          {/* <MoreVertical className="cursor-pointer" /> */}
                          <DropdownMenu asChild>
                            <DropdownMenuTrigger
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 cursor-pointer"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectNotificationGroup(notificationGroup);
                                  setOpenModalUpdate(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" /> Chỉnh sửa
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectNotificationGroup(notificationGroup);
                                  setOpenModalDelete(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedId === notificationGroup.id && (
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 border-t border-gray-200 rounded-b-xl px-6 py-4"
                          >
                            {isLoadingDetail ? (
                              <p className="text-sm text-gray-500">
                                Đang tải chi tiết...
                              </p>
                            ) : (
                              <>
                                <p className="text-sm text-gray-800 mb-2">
                                  Nội dung:
                                  {detailNotify.content || "Không có nội dung"}
                                </p>

                                {detailNotify.fileNotifications?.length > 0 && (
                                  <div className="space-y-2">
                                    {detailNotify.fileNotifications.map(
                                      (file, index) => (
                                        <div
                                          key={index}
                                          className="border rounded-lg p-3 flex items-center space-x-4 hover:bg-gray-100 transition-colors"
                                        >
                                          <FileText className="text-blue-600" />
                                          <div className="flex-1">
                                            {/* <p className="font-medium">
                                              {file.displayName || "Không tên"}
                                            </p> */}
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
                                      )
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
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
        {openModalDelete && (
          <DeleteNotificationGroup
            onOpen={openModalDelete}
            onClose={() => setOpenModalDelete(false)}
            onSuccess={() => fetchListNotificationGroup()}
            notify={selectNotificationGroup}
          />
        )}
        {openModalUpdate && (
          <UpdateNotificationGroup
            open={openModalUpdate}
            onClose={() => setOpenModalUpdate(false)}
            onSuccess={() => fetchListNotificationGroup()}
            notify={selectNotificationGroup}
          />
        )}
      </div>
    </motion.div>
  );
};
export default DetailGroupLecturer;
