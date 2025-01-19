import { Avatar, AvatarGroup } from "@mui/material";

export default function MemberAvatars({ members }) {
  return (
    <AvatarGroup max={5}>
      {members.map((member) => (
        <Avatar key={member.name} sx={{ backgroundColor: member.color }}>
          {member.name[0]}
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
