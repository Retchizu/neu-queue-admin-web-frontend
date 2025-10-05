"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import LogsClient from "./_components/logs-client";
import { ActivityLog, ActionType } from "@/types/log";
import { useVerifyUser } from "@/hooks/useVerifyUser";

const Activity = () => {
  useVerifyUser();
  const [search, setSearch] = useState("");

  const logs: ActivityLog[] = [
    {
      id: "l_01",
      userId: "e_01",
      action: ActionType.LOG_IN,
      timestamp: Date.now() - 1000 * 60 * 60,
      details: "User logged in",
    },
    {
      id: "l_02",
      userId: "e_02",
      action: ActionType.JOIN_QUEUE,
      timestamp: Date.now() - 1000 * 60 * 30,
      details: "Joined service A",
    },
    {
      id: "l_03",
      userId: "e_03",
      action: ActionType.SERVE_CUSTOMER,
      timestamp: Date.now() - 1000 * 60 * 5,
      details: "Served ticket #42",
    },
  ];

  return (
    <Card className="h-full w-full">
      <CardContent className="">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search logs..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="ml-auto">Export</Button>
        </div>
        <LogsClient logs={logs} search={search} />
      </CardContent>
    </Card>
  );
};

export default Activity;
