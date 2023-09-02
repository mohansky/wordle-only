import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PasswordForm from "./password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function UpdatePassword() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Card className="w-[400px] my-10">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Enter your new password below and confirm it. <br />
            It needs to be alteast 6 characters long.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <PasswordForm user={session?.user} />
        </CardContent>
      </Card>
    </>
  );
}
