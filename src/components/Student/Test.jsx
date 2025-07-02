import React, { useState } from "react";
import axios from "axios";

const TestNotificationSender = () => {
  const [studentId, setStudentId] = useState("");

  const handleSendTestNotification = async () => {
    if (!studentId.trim()) {
      alert("Vui lòng nhập Student ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/test`, {
        params: { studentId },
      });
      console.log("Test API response:", response.data);
      alert("Đã gửi yêu cầu test!");
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Gửi test thất bại.");
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}
    >
      <h2>Test Schedule Notification</h2>
      <input
        type="text"
        placeholder="Nhập Student ID..."
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        style={{ padding: "8px", width: "80%", marginBottom: "12px" }}
      />
      <br />
      <button
        onClick={handleSendTestNotification}
        style={{ padding: "8px 16px" }}
      >
        Gửi Thông Báo Test
      </button>
    </div>
  );
};

export default TestNotificationSender;
