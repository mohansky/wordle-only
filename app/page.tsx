import { ReactNode } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TodaysScores from "@/components/TodaysScores";

import DateFormat from "@/components/date-format";
import AddScoreNew from "@/components/add-score";

export const dynamic = "force-dynamic";

export type Scores = {
  map(arg0: (score: any) => import("react").JSX.Element): ReactNode;
  id: number;
  username: string;
  created_at: string;
  wordle: number;
  worldle: number;
  quordle: number;
  profiles: any;
};
 
export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: scores } = await supabase
    .from("scores")
    .select("*, profiles(*)");

  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id);

  const today = new Date().toISOString(); 

  if (session) {
    return (
      <div className="w-full flex flex-col items-center">
        <>
          {profiles?.map((profile) => (
            <h3 key={profile.id} className="font-semibold text-xl mt-10">
              {" "}
              Hi {profile.username} Today is <DateFormat dateString={today} />{" "}
              !!!
            </h3>
          ))}
        </>
        <AddScoreNew user={user}/>
        <div>
          <TodaysScores scores={scores} />
        </div>
      </div>
    );
  }
  {
    return (
      <div className="w-full flex flex-col items-center">
        <h3 className="font-semibold text-xl my-10">
          Hello User Log in to add your score!!!
        </h3>
        <div>
          <TodaysScores scores={scores} />
        </div>
      </div>
    );
  }
}
