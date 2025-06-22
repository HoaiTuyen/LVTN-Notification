import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { handleDetailGroup } from "../../../controller/GroupController";
import { gradientBackgroundFromString } from "../../../config/color";
import { Copy } from "lucide-react";
const DetailGroupLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [groupDetail, setGroupDetail] = useState({});
  const [members, setMembers] = useState([]);

  const backUrl = location.state?.from || "/giang-vien/groupClass";
  const fetchDetailGroup = async () => {
    const detailGroup = await handleDetailGroup(groupId);
    console.log(detailGroup);

    if (detailGroup?.data && detailGroup.status === 200) {
      setGroupDetail(detailGroup.data);
      setMembers(detailGroup.data.members);
    }
  };
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  const teachers = [
    {
      name: "Hoang Khue",
      avatar: "https://example.com/avatar.jpg", // Thay bằng ảnh thực nếu có
    },
  ];

  const classmates = [
    { name: "Hao Chau Minh" },
    { name: "I'm Duc" },
    { name: "Ngo Trieu Phu" },
    { name: "Nguyen Anh Phu 11A506" },
    // ...thêm các học sinh khác
  ];
  useEffect(() => {
    fetchDetailGroup();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="framer-motion-page"
    >
      <div className="min-h-screen w-full bg-white p-10 overflow-y-auto max-h-[500px]">
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
          <Tabs defaultValue="stream" className="px-6 pt-8 pb-3">
            <TabsList>
              <TabsTrigger
                value="stream"
                className="data-[state=active]:text-blue-600"
              >
                Trang chủ
              </TabsTrigger>
              <TabsTrigger value="notification">Thông báo</TabsTrigger>
              <TabsTrigger value="member">Thành viên</TabsTrigger>
            </TabsList>
            <TabsContent value="stream">
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

                  {/* <div className="p-4 bg-white border rounded shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="bg-pink-500 p-2 rounded-full text-white">
                        📄
                      </div>
                      <div>
                        <p className="font-medium">
                          tuyen hoai posted a new assignment: Test
                        </p>
                        <p className="text-sm text-gray-500">2:27 PM</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="member">
              <div className="max-w-3xl mx-auto py-8 px-4">
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
                      <AvatarFallback>
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
                      {members.length} students
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
export default DetailGroupLecturer;
