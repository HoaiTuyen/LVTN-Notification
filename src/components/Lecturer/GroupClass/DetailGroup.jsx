import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { handleDetailGroup } from "../../../controller/GroupController";
const DetailGroupLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupId } = useParams();

  const backUrl = location.state?.from || "/giang-vien/groupClass";
  const fetchDetailGroup = async () => {
    const detailGroup = await handleDetailGroup(groupId);
    console.log(detailGroup);
  };
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
              <TabsTrigger value="academic">Thông báo</TabsTrigger>
            </TabsList>
            <TabsContent value="stream">
              <div className="bg-orange-400 text-white p-6 flex justify-between items-start h-[240px] rounded-2xl">
                <div>
                  <h1 className="text-3xl font-bold">Lập trinh web</h1>
                  <p className="text-lg">Nguyễn hoài Tuyên</p>
                </div>
                <button className="bg-white text-black rounded px-3 py-1 text-sm font-medium shadow">
                  Customize
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                {/* Class code */}
                <div className="w-[150px] p-4 bg-white border rounded shadow-sm h-fit shrink-0">
                  <h3 className="text-sm text-gray-600 mb-1">Class code</h3>
                  <div className="text-xl font-mono text-blue-600">
                    sgd7ttuj
                  </div>
                </div>

                {/* Announcement + Activity */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white border rounded shadow-sm">
                    <img
                      src="/placeholder.svg"
                      alt="avatar"
                      className="h-10 w-10 rounded-full"
                    />
                    <Input
                      placeholder="Announce something to your class"
                      className="flex-1"
                    />
                  </div>

                  <div className="p-4 bg-white border rounded shadow-sm">
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
