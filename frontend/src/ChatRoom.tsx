import React, { useRef, useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

interface ChatRoomProps {
  name: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ name }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const stompClientRef = useRef<any>(null);

  useEffect(() => {
    const wsUrl =
      "http://ip172-18-0-37-d1jp7ja91nsg00brv040-8080.direct.labs.play-with-docker.com/ws";
    const socket = new SockJS(wsUrl);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/messages", (msg: any) => {
        if (msg.body) {
          setChat((prev) => [...prev, msg.body]);
        }
      });
    });
    stompClientRef.current = stompClient;
  }, []);

  const sendMessage = () => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      message.trim()
    ) {
      const fullMessage = `${name}: ${message}`;
      stompClientRef.current.send("/app/chat/send", {}, fullMessage);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        margin: "40px auto",
        maxWidth: 400,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
        padding: 24,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>
        Welcome, {name}!
      </h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: 8,
          height: 200,
          overflowY: "auto",
          background: "#fafafa",
          marginBottom: 8,
        }}
      >
        {chat.map((msg, idx) => (
          <div style={{ color: "black" }} key={idx}>
            {msg}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          id="message"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, marginRight: 8 }}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
