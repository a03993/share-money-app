import { Avatar, Typography } from "@mui/material";

export default function UserAvatar({ user, mr }) {
  return (
    <>
      <Avatar
        className="small-mui-avatar"
        sx={{
          backgroundColor: user.avatarColor,
          mr: 0.5,
          ml: mr || 0,
        }}
      >
        {user.name[0]?.toUpperCase()}
      </Avatar>
      <Typography
        className="font-size-list-secondary font-weight-thin font-color-dark-gray"
        sx={{ mr: 1 }}
      >
        {user.name}
      </Typography>
    </>
  );
}
