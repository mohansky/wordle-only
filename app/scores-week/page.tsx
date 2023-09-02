"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ScoresDataTable from "@/components/ScoresDataTable";
import { ReactNode, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DateFormat from "@/components/date-format";
import ScoresBarChart from "@/components/BarChart";
import ScoresDonutChart from "@/components/DonutChart";
import TotalFormat from "@/components/TotalFormat";

export default function ScoresWeek() {
  const [scores, setScores] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const date1: Date = new Date();
    const date2: Date = new Date();
    date2.setDate(date2.getDate() - 1); // just for example so that we do not have the same date twice

    const dateString1: string = date1.toISOString();
    const dateString2: string = date2.toISOString();

    const getScores = async () => {
      const { data } = await supabase.from("scores").select("*, profiles(*)");
      // .lt('created_at', dateString1)
      // .gt('created_at', dateString2);
      // .order("created_at", { ascending: false });
      if (data) {
        setScores(data);
      }
    };
    getScores();
  }, [supabase, setScores]);

  type Scores = {
    map(arg0: (score: any) => import("react").JSX.Element): ReactNode;
    id: number;
    username: string;
    created_at: string;
    wordle: number;
    worldle: number;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    profiles: any;
    // score?: any;
  };

  const columns: ColumnDef<Scores>[] = [
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => <DateFormat dateString={row.getValue("created_at")} />,
    },
    {
      accessorKey: "profiles.username",
      header: "User",
      // header: ({ column }) => {
      //   return (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //     >
      //       User
      //       <CaretSortIcon className="ml-2 h-4 w-4" />
      //     </Button>
      //   )
      // },
      // cell: ({ row }) => <div>{row.getValue("profiles.username")}</div>,
    },
    {
      accessorKey: "wordle",
      header: "Wordle",
    },
    {
      accessorKey: "worldle",
      header: "Worldle",
    },
    {
      header: "Quordle",
      cell: (props) => (
        <>
          <span className="mr-1">{props.row.original.q1}</span>
          <span className="mr-1">{props.row.original.q2}</span>
          <span className="mr-1">{props.row.original.q3}</span>
          <span className="mr-1">{props.row.original.q4}</span>
        </>
      ),
    },
    {
      header: "Score",
      accessorKey: "total",
      cell: (props) => (
        <>
          <TotalFormat
            total={
              props.row.original.wordle / 6 +
              props.row.original.worldle / 6 +
              props.row.original.q1 / 9 +
              props.row.original.q2 / 9 +
              props.row.original.q3 / 9 +
              props.row.original.q4 / 9
            }
          />
        </>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-xl mx-auto my-10">
        <ScoresDataTable columns={columns} data={scores} />
      </div>
      <div className="w-1/2">
      {/* <div className="max-w-xl mx-auto my-10"> */}
        <ScoresBarChart chartdata={scores} />
      </div>
      {/* <div className="max-w-xl mx-auto my-10">
        <ScoresBarChart data={scores} />
      </div>
      <div className="w-full">
        <ScoresDonutChart scores={scores} />
      </div> */}
    </div>
  );
}
