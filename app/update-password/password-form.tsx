"use client";
import { useState, FormEvent } from "react";
import { User,createClientComponentClient, } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast"; 

interface FormData {
  password: string;
  passwordConfirm: string;
}

export default function PasswordForm({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient();
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // reset all states
    setFormSuccess(false);
    setErrors(undefined);
    setMessage("");

    const password = formData.password;
    const passwordConfirm = formData.passwordConfirm;

    if (password !== passwordConfirm) {
      setFormSuccess(false);
      setMessage("Passwords don't match");
      console.log("Passwords don't match");
    } else {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(error.message);
        return;
      }

      setFormData({ password: "", passwordConfirm: "" });
      setFormSuccess(true);
      setMessage("Your password was updated successfully.");
      toast({ title: "Your password was updated successfully." });
    }
  };

  return (
    <div>
      <CardDescription className="mb-5">
        Hi {user?.email}, <br />
        try not to forget it this time!
      </CardDescription>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="password" className="mt-5">
          Password
        </Label>
        <Input
          className="mb-3"
          id="password"
          name="password"
          type="password"
          minLength={6}
          value={formData?.password ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Label htmlFor="passwordConfirm" className="mt-5">
          Confirm Password
        </Label>
        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          minLength={6}
          value={formData.passwordConfirm ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, passwordConfirm: e.target.value })
          }
        />
        <Button className="mt-5">Update Password</Button>

        {message ? (
          <p
            className={`${
              formSuccess
                ? "text-amber-400"
                : "text-red-600"
            }  mt-4 p-4 bg-neutral-900 text-neutral-300 text-center`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
