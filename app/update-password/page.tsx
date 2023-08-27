import React from "react";
import Messages from "../login/messages";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function UpdatePassword() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
            <CardDescription>
              Update your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form
              className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground" 
              method="post"
            >
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="you@email.com"
                required
              /> 
              <Label htmlFor="password" className="mt-5">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                minLength={6}
                maxLength={10}
                required
              />
              <div className="flex mt-5"> 
                <Button className="mr-3" formAction="/auth/update-password">
                  Send
                </Button>
              </div>
              <Messages />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
