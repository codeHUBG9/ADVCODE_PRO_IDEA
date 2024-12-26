import React from "react";
import { Box, Typography } from "@mui/material";
import Message from "./Message";
import MessageInput from "./MessageInput";
import UserList from "./UserList";

const ChatRoom = ({ messages, users, sendMessage }) => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar for users */}
      <Box width="20%" bgcolor="#f0f0f0" p={2}>
        <Typography variant="h6">Online Users</Typography>
        <UserList users={users} />
      </Box>

      {/* Chat messages */}
      <Box width="80%" display="flex" flexDirection="column">
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg, index) => (
            <Message key={index} {...msg} />
          ))}
        </Box>
        <MessageInput onSend={sendMessage} />
      </Box>
    </Box>
  );
};

export default ChatRoom;
