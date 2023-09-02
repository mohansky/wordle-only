import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./account-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const revalidate = 0;

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Card className="w-[400px] my-10">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. <br /> Click save when you're
            done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <AccountForm session={session} />
        </CardContent>
      </Card>
    </>
  );
}
