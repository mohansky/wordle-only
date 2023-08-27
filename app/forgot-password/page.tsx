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

export default function ForgotPassword() {
  return (
    <>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Recover Password</CardTitle>
            <CardDescription>
              You will receive an email to recover your password. <br/>
              Also check your spam folder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form
              className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
              action="/auth/password-reset"
              method="post"
            >
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="you@email.com"
                required
              />
              <div className="flex mt-5"> 
                <Button className="mr-3">Send</Button>
              </div>
              <Messages />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
