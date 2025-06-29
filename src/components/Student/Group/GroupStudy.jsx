import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "antd";
import { jwtDecode } from "jwt-decode";
import {
  Plus,
  MessageSquare,
  MoreVertical,
  Ellipsis,
  Trash2,
  Users,
  Pencil,
  FileText,
  User,
  Folder,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

import { handleListGroupByStudent } from "../../../controller/AccountController";
import JoinGroup from "./JoinGroup";
import {
  gradientBackgroundFromString,
  hashColorFromString,
} from "../../../config/color";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const GroupStudyStudent = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;

  const fetchListGroup = async (page = 1) => {
    const listGroup = await handleListGroupByStudent(
      userId,
      page - 1,
      pagination.pageSize
    );
    console.log(listGroup);

    if (listGroup?.data || listGroup?.status === 200) {
      setGroups(listGroup.data);

      setPagination({
        current: page,
        pageSize: listGroup.data.pageSize,
        total: listGroup.data.totalElements,
        totalPages: listGroup.data.totalPages,
        totalElements: listGroup.data.totalElements,
      });
    }
  };

  useEffect(() => {
    fetchListGroup();
  }, []);
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    // <div className="min-h-screen w-full bg-white">
    //   <div className="p-6">
    //     <div className="max-w-7xl mx-auto space-y-8">
    //       {/* Header */}
    //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    //         <h1 className="text-3xl font-bold text-gray-800">Nhóm học tập</h1>
    //         <Dialog>
    //           <Button
    //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
    //             onClick={() => setOpenModal(true)}
    //           >
    //             <Plus className="h-4 w-4" />
    //             Tham gia nhóm
    //           </Button>
    //           {openModal && (
    //             <JoinGroup
    //               open={openModal}
    //               onClose={() => setOpenModal(false)}
    //               onSuccess={fetchListGroup}
    //             />
    //           )}
    //         </Dialog>
    //       </div>

    //       {/* Grid of cards */}
    //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    //         {groups.length === 0 ? (
    //           <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-16">
    //             <Users className="w-16 h-16 mb-4" />
    //             <p className="text-lg font-semibold">
    //               Không có nhóm học tập nào
    //             </p>
    //           </div>
    //         ) : (
    //           groups.map((group) => (
    //             <Card
    //               key={group.groupId}
    //               className="relative rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 h-[300px] w-full flex flex-col"
    //             >
    //               {/* Header */}
    //               <div
    //                 className="h-24 px-4 py-3 flex items-start justify-between text-white"
    //                 style={{
    //                   backgroundColor: groupColors[group.groupId] || "#64748b",
    //                 }}
    //               >
    //                 <h2 className="text-lg font-semibold">{group.groupName}</h2>
    //               </div>

    //               {/* Body */}
    //               <CardContent className="p-4 mt-auto text-sm text-gray-700 space-y-2">
    //                 <div>
    //                   <span className="font-medium">Giảng viên:</span>{" "}
    //                   <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-md ml-2 min-w-[100px] text-center">
    //                     {group.teacherName || "Trống"}
    //                   </span>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           ))
    //         )}
    //       </div>

    //       {/* Pagination */}
    //       {pagination.total > pagination.pageSize && (
    //         <div className="flex justify-center mt-6">
    //           <Pagination
    //             current={pagination.current}
    //             pageSize={pagination.pageSize}
    //             total={pagination.total}
    //             onChange={(page) => fetchListGroup(page)}
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen w-full bg-white">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Nhóm học tập</h1>
            <Dialog>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
                onClick={() => setOpenModal(true)}
              >
                <Plus className="h-4 w-4" />
                Tham gia nhóm
              </Button>
              {openModal && (
                <JoinGroup
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  onSuccess={fetchListGroup}
                />
              )}
            </Dialog>
          </div>

          {/* Grid of cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {groups.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-16">
                <Users className="w-16 h-16 mb-4" />
                <p className="text-lg font-semibold">
                  Không có nhóm học tập nào
                </p>
              </div>
            ) : (
              groups.map((group) => (
                <Card
                  key={group.groupId}
                  className="relative p-0 rounded-xl overflow-hidden shadow border w-full h-[300px] flex flex-col justify-between"
                >
                  {/* Header - ảnh nền + tên + giảng viên */}
                  <div
                    className="relative h-28 px-4 py-3 text-white"
                    style={{
                      backgroundImage: gradientBackgroundFromString(
                        group.groupId
                      ),
                      color: "white",
                    }}
                  >
                    <div className="relative z-10">
                      <h2
                        className="text-lg font-semibold truncate cursor-pointer"
                        title={group.groupName}
                        onClick={() => {
                          navigate(`/sinh-vien/group-study/${group.groupId}`);
                        }}
                      >
                        {group.groupName}
                      </h2>
                      <p className="text-sm mt-1">
                        {group.teacherName || "GV.Tam"}
                      </p>
                    </div>

                    {/* Avatar chữ viết tắt */}
                    <div className="absolute -bottom-9 right-4 z-20">
                      <div className="w-20 h-20 rounded-full text-white flex items-center justify-center font-bold text-xl border-4 border-white shadow">
                        <Avatar className="h-19 w-19">
                          <AvatarFallback className="bg-blue-500 text-white text-xl">
                            {getInitials(group.teacherName || "GV")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>

                  {/* Body trống hoặc nội dung khác nếu có */}
                  <div className="flex-grow px-4 pt-6"></div>

                  {/* Footer: Icon điều hướng */}
                  <div className="border-t flex justify-end gap-8 py-2 text-gray-700">
                    <button className="hover:text-blue-600">
                      <User className="w-5 h-5" />
                    </button>
                    <button className="hover:text-blue-600 pr-4">
                      <Folder className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.total > pagination.pageSize && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={(page) => fetchListGroup(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupStudyStudent;
