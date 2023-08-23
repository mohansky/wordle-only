"use client";
import { useCallback, useEffect, useState } from "react";
// import { Database } from '../database.types'
import {
  Session,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function AddScoreNew({ user }: { user: User | null }) {
  const router = useRouter(); 
  const supabase = createClientComponentClient(); 
  const [wordle, setWordle] = useState<string | null>(null);
  const [worldle, setWorldle] = useState<string | null>(null);
  const [quordle, setQuordle] = useState<string | null>(null);

  const { toast } = useToast();

  async function updateProfile({
    wordle,
    worldle,
    quordle,
  }: {
    wordle: string | null;
    worldle: string | null;
    quordle: string | null;
  }) {
    try {
      let { error } = await supabase.from("scores").upsert({ 
        wordle,
        worldle,
        quordle,
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({ title: "Score added!" });
    } catch (error) {
      toast({ title: "Error adding score! Please try again." });
    } finally {
      router.refresh();
    }
  }

  return (
    <div 
      className="max-w-sm"> 
      <div className="form-widget my-10">
        <div className="mt-5 hidden">
          <label htmlFor="email">User</label>
          <Input id="email" type="text" value={user?.id} disabled />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="mt-5">
            <label htmlFor="wordle">Wordle</label>
            <Input
              id="wordle"
              type="number"
              value={wordle || ""}
              onChange={(e) => setWordle(e.target.value)} 
            />
          </div>
          <div className="mt-5">
            <label htmlFor="worldle">Worldle</label>
            <Input
              id="worldle"
              type="number"
              value={worldle || ""}
              onChange={(e) => setWorldle(e.target.value)} 
            />
          </div>
          <div className="mt-5">
            <label htmlFor="quordle">Quordle</label>
            <Input
              id="quordle"
              type="number"
              value={quordle || ""}
              onChange={(e) => setQuordle(e.target.value)} 
            />
          </div>
        </div>

        <div className="flex gap-4 mt-5">
          <Button onClick={() => updateProfile({ wordle, worldle, quordle })}>
            Add Score
          </Button>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
