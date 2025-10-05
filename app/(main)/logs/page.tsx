"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import LogsClient from "./_components/logs-client";
import { ActivityLog, ActionType } from "@/types/log";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import { ScrollArea } from "@/components/ui/scroll-area";

const Activity = () => {
  useVerifyUser();
  const [search, setSearch] = useState("");

  const logs: ActivityLog[] = React.useMemo(() => {
    const actions = [
      ActionType.LOG_IN,
      ActionType.LOG_OUT,
      ActionType.JOIN_QUEUE,
      ActionType.LEAVE_QUEUE,
      ActionType.SERVE_CUSTOMER,
      ActionType.SKIP_CUSTOMER,
      ActionType.COMPLETE_TRANSACTION,
      ActionType.ASSIGN_ROLE,
      ActionType.BLOCK_EMAIL,
      ActionType.UNBLOCK_EMAIL,
    ];

    const detailsByAction: Record<string, string[]> = {
      [ActionType.LOG_IN]: [
        "User logged in",
        "Login via SSO",
        "Password login",
      ],
      [ActionType.LOG_OUT]: ["User logged out"],
      [ActionType.JOIN_QUEUE]: [
        "Joined service A",
        "Joined service B",
        "Joined VIP queue",
      ],
      [ActionType.LEAVE_QUEUE]: ["Left queue before service"],
      [ActionType.SERVE_CUSTOMER]: [
        "Served ticket #42",
        "Served ticket #7",
        "Served VIP customer",
      ],
      [ActionType.SKIP_CUSTOMER]: ["Skipped ticket #13"],
      [ActionType.COMPLETE_TRANSACTION]: [
        "Completed payment",
        "Completed refund",
      ],
      [ActionType.ASSIGN_ROLE]: [
        "Assigned role: admin",
        "Assigned role: attendant",
      ],
      [ActionType.BLOCK_EMAIL]: ["Blocked user@example.com"],
      [ActionType.UNBLOCK_EMAIL]: ["Unblocked user@example.com"],
    };

    const count = 50;
    const now = Date.now();

    return Array.from({ length: count }).map((_, i) => {
      const action = actions[i % actions.length];
      const detailsOptions = detailsByAction[action] ?? ["Action performed"];
      const details = detailsOptions[i % detailsOptions.length];
      return {
        id: `l_${String(i + 1).padStart(3, "0")}`,
        userId: `e_${String((i % 12) + 1).padStart(3, "0")}`,
        action,
        timestamp: now - i * 1000 * 60 * 2,
        details,
        metadata: { seq: i + 1 },
      } as ActivityLog;
    });
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>
          These are all the event logs that happened within the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full min-h-0">
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

        <ScrollArea className="flex-1 min-h-0">
          <LogsClient logs={logs} search={search} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Activity;
