import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AvatarGroup() {
  return (
    <div className="flex justify-center space-x-[-8px]">
      <Avatar>
        <AvatarFallback className="bg-avatar-beige border-2 border-white">
          A
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-avatar-gold border-2 border-white">
          B
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-avatar-yellow border-2 border-white">
          C
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-avatar-peach border-2 border-white">
          D
        </AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-avatar-gray border-2 border-white">
          E
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
