"use client";
import { useState } from "react";
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
  const [wordle, setWordle] = useState<number | null>(null);
  const [worldle, setWorldle] = useState<number | null>(null); 
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);
  const [q3, setQ3] = useState<number | null>(null);
  const [q4, setQ4] = useState<number | null>(null);

  const { toast } = useToast();

  async function updateProfile({
    wordle,
    worldle, 
    q1,
    q2,
    q3,
    q4,
  }: {
    wordle: number | null;
    worldle: number | null; 
    q1: number | null;
    q2: number | null;
    q3: number | null;
    q4: number | null;
    
  }) {
    try {
      let { error } = await supabase.from("scores").upsert({
        wordle,
        worldle, 
        q1,
        q2,
        q3,
        q4,
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
    <div className="max-w-sm">
      <div className="form-widget my-10">
        <div className="mt-5 hidden">
          <label htmlFor="email">User</label>
          <Input id="email" type="text" value={user?.id} disabled />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-5">
            <label htmlFor="wordle">Wordle</label>
            <Input
              id="wordle"
              type="number"
              value={wordle || ""}
              onChange={(e) => setWordle(e.target.valueAsNumber)}
              min="1" max="7"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="worldle">Worldle</label>
            <Input
              id="worldle"
              type="number"
              value={worldle || ""}
              onChange={(e) => setWorldle(e.target.valueAsNumber)}
              min="1" max="7"
            />
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="quordle">Quordle</label>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Input
              id="q1"
              type="number"
              value={q1 || ""}
              onChange={(e) => setQ1(e.target.valueAsNumber)}
              min="1" max="10"
            />
          </div>
          <div>
            <Input
              id="q2"
              type="number"
              value={q2 || ""}
              onChange={(e) => setQ2(e.target.valueAsNumber)}
              min="1" max="10"
            />
          </div>
          <div>
            <Input
              id="q3"
              type="number"
              value={q3 || ""}
              onChange={(e) => setQ3(e.target.valueAsNumber)}
              min="1" max="10"
            />
          </div>
          <div>
            <Input
              id="q4"
              type="number"
              value={q4 || ""}
              onChange={(e) => setQ4(e.target.valueAsNumber)}
              min="1" max="10"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <Button onClick={() => updateProfile({ wordle, worldle, q1, q2, q3, q4 })}>
            Add Score
          </Button>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
