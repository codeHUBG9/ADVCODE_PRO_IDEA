import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      "ws://localhost:8080", 
      (data) => {
        if (data.type === "message") {
          setMessages((prev) => [...prev, data]);
        } else if (data.type === "user_list") {
          setUsers(data.users);
        }
      }
    );

    setSocket(ws);

    return () => {
      ws.close(); // Cleanup connection on unmount
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify({ type: "message", content: message }));
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/chat">
          <ChatRoom messages={messages} users={users} sendMessage={sendMessage} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <h2>Welcome to the Chat App</h2>
          <p>To start chatting, navigate to the <a href="/chat">Chat Room</a></p>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
