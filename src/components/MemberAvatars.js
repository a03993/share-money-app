import { Avatar, AvatarGroup } from "@mui/material";

export default function MemberAvatars({ members }) {
  return (
    <AvatarGroup max={5} sx={{ justifyContent: "center" }}>
      {members.map((member) => (
        <Avatar key={member.name} sx={{ backgroundColor: member.color }}>
          {member.name[0]?.toUpperCase()}
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
