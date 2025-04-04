import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserType } from "@/lib/type";

export function AvatarGroup({ users }: { users: UserType[] }) {
  return (
    <div className="flex justify-center space-x-[-8px]">
      {users.map((user) => (
        <Avatar key={user._id}>
          <AvatarFallback
            className="border-2 border-white"
            style={{ backgroundColor: user.color }}
          >
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
