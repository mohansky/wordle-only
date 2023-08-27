import Link from "next/link";
import Messages from "./messages";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {/* <CardDescription>
            If you have an account sign in if yohere. <br /> Click save when you're
            done.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-2">
          <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action="/auth/sign-in"
            method="post"
          >
            <Label htmlFor="email" className="mt-5">
              Email
            </Label>
            <Input name="email" placeholder="you@example.com" required />
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
            <div className="flex my-5 ">
              <Button className="mr-3">Sign In</Button>
              <Button variant={"outline"} formAction="/auth/sign-up">
                Sign Up
              </Button>
            </div>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Forgot password
            </Link>
            <Messages />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
