import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserType } from "@/lib/type";
import { cn } from "@/lib/utils";

interface AvatarGroupProps {
  users: UserType[];
  maxDisplay: number;
  select?: boolean;
}

export function AvatarGroup({
  users,
  maxDisplay = 4,
  select,
}: AvatarGroupProps) {
  const displayUsers = users.slice(0, maxDisplay);
  const hiddenCount = users.length - maxDisplay;

  return (
    <div
      className={cn(
        "flex justify-center space-x-[-8px]",
        select && "space-x-[-6px]",
      )}
    >
      {displayUsers.map((user) => (
        <Avatar key={user._id} className={`${select && "size-7"}`}>
          <AvatarFallback
            className={cn(
              "border-2 border-white",
              select && "border-gray-lightest text-md",
            )}
            style={{ backgroundColor: user.color }}
          >
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}

      {hiddenCount > 0 && (
        <Avatar className={`${select && "size-7"}`}>
          <AvatarFallback
            className={cn(
              "border-2 border-white bg-gray-light text-md",
              select && "border-gray-lightest text-sm",
            )}
          >
            +{hiddenCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
