"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { ActivityLog } from "@/types/log";
import { DataTable } from "./data-table";

interface Props {
  logs: ActivityLog[];
  search?: string;
}

export default function LogsClient({ logs, search }: Props) {
  const columns: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: "userId",
      header: "User ID",
      cell: ({ getValue }) => (
        <div className="font-medium">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ getValue }) => (
        <div className="uppercase">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ getValue }) => (
        <div className="text-sm text-muted-foreground">
          {getValue<string>() ?? "-"}
        </div>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "When",
      cell: ({ getValue }) => (
        <div className="text-sm text-muted-foreground">
          {new Date(getValue<number>()).toLocaleString()}
        </div>
      ),
    },
  ];

  const q = (search ?? "").trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return logs;
    return logs.filter((l) =>
      [l.userId, l.action, l.details, JSON.stringify(l.metadata)]
        .map((f) => (f ?? "").toLowerCase())
        .some((field) => field.includes(q))
    );
  }, [logs, q]);

  return (
    <div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
