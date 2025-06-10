import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRef, useEffect, useState } from "react";

const useWebSocket = () => {
  const stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const connectWebSocket = () => {
    const socket = new SockJS("http://localhost:8082/ws"); // Xác nhận port
    const stompClient = Stomp.over(socket);
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found in localStorage");
      setError("No access token found");
      return;
    }

    console.log("Connecting with token:", token);

    stompClient.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      () => {
        console.log("✅ Connected to WebSocket");
        stompClientRef.current = stompClient;
        setConnected(true);
        setError(null);
      },
      (error) => {
        console.error("❌ WebSocket error:", error);
        setConnected(false);
        setError(error.message || "Failed to connect to WebSocket");
      }
    );
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, []);

  return { stompClient: stompClientRef, connected, error };
};

export default useWebSocket;
