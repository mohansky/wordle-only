import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import DateFormat from "./date-format";
import { isToday } from "date-fns";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function TodaysScores() {
  const supabase = createServerComponentClient({ cookies });

  const { data: scores } = await supabase
    .from("scores")
    .select("*, profiles(*)");

  return (
    <Table>
      <TableCaption>Todays scores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Date</TableHead>
          <TableHead className="w-[80px]">User</TableHead>
          <TableHead>Wordle</TableHead>
          <TableHead>Worldle</TableHead>
          <TableHead className="text-right">Quordle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores?.map((score) => (
          <TableRow key={score.id}>
            {isToday(new Date(score.created_at)) ? (
              <>
                <TableCell>
                  <DateFormat dateString={score.created_at} />
                </TableCell>
                <TableCell className="font-medium">
                  {score.profiles.username}
                </TableCell>
                <TableCell className="text-center">{score.wordle}</TableCell>
                <TableCell className="text-center">{score.worldle}</TableCell>
                <TableCell className="text-center">{score.quordle}</TableCell>
              </>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
