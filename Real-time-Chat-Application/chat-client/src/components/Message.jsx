import React from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ username, content, timestamp }) => {
  return (
    <Box mb={1}>
      <Typography variant="subtitle2" color="primary">
        {username} <small>{new Date(timestamp).toLocaleTimeString()}</small>
      </Typography>
      <Typography variant="body1">{content}</Typography>
    </Box>
  );
};

export default Message;
