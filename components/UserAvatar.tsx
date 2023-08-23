import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({profile}: any) {
  return (
    <div key={profile.id}>
      <Avatar>
        <AvatarImage src={profile.avatar_url.publicURL} />
        <AvatarFallback>
          {profile.nick ? profile.nick : profile.username}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
