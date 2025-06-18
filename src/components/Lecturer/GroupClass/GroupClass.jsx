import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MessageSquare,
  MoreVertical,
  Ellipsis,
  Trash2,
  Users,
  Pencil,
  FileText,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { handleListGroupByUserId } from "../../../controller/GroupController";
import LecturerAddGroup from "./createGroup";
import LecturerDeleteGroup from "./DeleteGroup";
import { Pagination } from "antd";
import { jwtDecode } from "jwt-decode";

const GroupClassTeacher = () => {
  const [groups, setGroups] = useState([]);
  const [groupColors, setGroupColors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectGroup, setSelectGroup] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const handleGroupCreated = (groupId, color) => {
    setGroupColors((prev) => ({ ...prev, [groupId]: color }));
    fetchListGroup(); // reload lại list group sau khi tạo
  };
  const token = localStorage.getItem("access_token");
  const data = jwtDecode(token);
  const userId = data.userId;

  const fetchListGroup = async (page = 1) => {
    const listGroup = await handleListGroupByUserId(
      userId,
      page - 1,
      pagination.pageSize
    );

    if (listGroup?.data || listGroup?.status === 200) {
      const colorsFromStorage = JSON.parse(
        localStorage.getItem("groupColors") || "{}"
      );
      setGroups(listGroup.data.studyGroups);
      setGroupColors(() => {
        const newColors = {};
        listGroup.data.studyGroups.forEach((group) => {
          newColors[group.id] = colorsFromStorage[group.id] || "#ccc";
        });
        return newColors;
      });
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
  return (
    <div className="min-h-screen w-full bg-white p-0 ">
      <div className=" p-6 overflow-y-auto max-h-[600px]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Nhóm học tập</h1>
            <Dialog>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setOpenModal(true)}
              >
                <Plus className=" h-4 w-4" />
                Tạo nhóm mới
              </Button>
              {openModal && (
                <LecturerAddGroup
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  onSuccess={fetchListGroup}
                  onCreateWithColor={handleGroupCreated}
                />
              )}
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  key={group.id}
                  className="relative rounded-xl shadow hover:shadow-lg overflow-hidden transition-all bg-white p-0 pb-5 h-[240px]"
                >
                  {/* BG 1/3 + tên nhóm */}
                  <div
                    className="relative w-full h-24 flex items-start justify-between p-3 text-white"
                    style={{
                      backgroundColor: groupColors[group.id] || "#ccc",
                    }}
                  >
                    <h2 className="text-lg font-semibold">{group.name}</h2>

                    {/* Dropdown trên nền */}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="ghost"
                            className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full p-1"
                            >
                            <MoreVertical size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-50" align="end">
                            <DropdownMenuItem
                            onClick={() => handleDelete(group.id)}
                            className="text-red-600"
                            >
                            Xoá nhóm
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu> */}
                    <DropdownMenu asChild>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <Ellipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link to="">
                            <FileText className="h-4 w-4" />
                            Xem chi tiết
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer "
                          onClick={() => {
                            setSelectGroup(group);
                            setOpenModalDelete(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Nội dung dưới 2/3 */}
                  <CardContent className="text-sm text-muted-foreground space-y-2 px-4 mt-auto pb-4">
                    <div>
                      <span className="font-medium text-gray-700">
                        Mã nhóm:
                      </span>
                      <code className="bg-gray-100 px-4 py-1 rounded ml-2 inline-block min-w-[120px] text-center">
                        {group.code}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        {openModalDelete && (
          <LecturerDeleteGroup
            onOpen={openModalDelete}
            onClose={() => setOpenModalDelete(false)}
            onSuccess={fetchListGroup}
            group={selectGroup}
          />
        )}
        <div className="flex justify-center mt-4">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page) => {
              fetchListGroup(page);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupClassTeacher;
