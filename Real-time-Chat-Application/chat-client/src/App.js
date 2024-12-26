import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import connectWebSocket from "./services/websocket";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = connectWebSocket(
      "ws://localhost:5000", 
      (data) => {
        if (data.type === "message") {
          setMessages((prev) => [...prev, data]);
        } else if (data.type === "user_list") {
          setUsers(data.users);
        }
      },
      () => console.log("WebSocket connection established"), // onOpen callback
      () => console.log("WebSocket connection closed")  // onClose callback
    );
  
    setSocket(ws);
  
    return () => {
      ws.close();  // Cleanup on unmount
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify({ type: "message", content: message }));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatRoom messages={messages} users={users} sendMessage={sendMessage} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h2>Welcome to the Chat App</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
