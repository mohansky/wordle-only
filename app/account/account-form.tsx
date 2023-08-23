"use client";
import { useCallback, useEffect, useState } from "react";
// import { Database } from '../database.types'
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
// import Avatar from "./avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function AccountForm({ session }: { session: Session | null }) {
  //   const supabase = createClientComponentClient<Database>()
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [nick, setNick] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const { toast } = useToast();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, nick, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setNick(data.nick);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    nick,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    nick: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        nick,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({ title: "Profile updated!",})
    } catch (error) {
      toast({ title: "Error updating user! Please try again.",}) 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget my-10">
{/*       <Avatar
        uid={user.id}
        url={avatar_url}
        size={75}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, nick, avatar_url: url });
        }}
      /> */}
      <div className="mt-5">
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div className="mt-5">
        <label htmlFor="fullName">Full Name</label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="mt-5">
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="mt-5">
        <label htmlFor="nick">Nick</label>
        <Input
          id="nick"
          type="text"
          value={nick || ""}
          onChange={(e) => setNick(e.target.value)}
          placeholder="nick"
        />
      </div>

      <div className="flex gap-4 mt-5">
        <Button
          onClick={() =>
            updateProfile({ fullname, username, nick, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
        <form action="/auth/signout" method="post">
          <Button type="submit" variant={"outline"}>Sign out</Button>
        </form>
        <Toaster />
      </div>

    </div>
  );
}
