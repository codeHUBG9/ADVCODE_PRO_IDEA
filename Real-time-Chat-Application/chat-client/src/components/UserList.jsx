import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const UserList = ({ users }) => {
  return (
    <List>
      {users.map((user, index) => (
        <ListItem key={index}>
          <ListItemText primary={user} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
