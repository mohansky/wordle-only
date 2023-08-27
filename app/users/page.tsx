"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ScoresDataTable from "@/components/ScoresDataTable";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

export default function Allprofiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getProfiles = async () => {
      const { data } = await supabase
        .from("profiles")
        .select();
      if (data) {
        setProfiles(data);
      }
    };
    getProfiles();
  }, [supabase, setProfiles]);

  type profiles = {
    username: number;
    full_name: number;
    nick: number;
  };

  const columns: ColumnDef<profiles>[] = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "nick",
      header: "Nick",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-xl mx-auto my-10">
        <ScoresDataTable columns={columns} data={profiles} />
      </div>
    </div>
  );
}
