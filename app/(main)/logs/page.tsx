"use client";
// ...existing imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import LogsClient from "./_components/logs-client";
import { ActivityLog } from "@/types/log";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "./_components/date-picker";
import api from "@/lib/api";

const Activity = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);

  // initialize default date range: yesterday -> today
  useEffect(() => {
    if (!startDate && !endDate) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      // set times to just date objects (UI will handle range expansion on fetch)
      setStartDate(yesterday);
      setEndDate(today);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!startDate || !endDate) return;
      setLoading(true);
      try {
        const startIso = new Date(startDate).toISOString();
        const endIso = new Date(endDate).toISOString();
        const resp = await api.get("/admin/get-activity", {
          params: { startDate: startIso, endDate: endIso },
        });
        const activities: ActivityLog[] = resp.data?.activities ?? [];
        setLogs(
          // ensure numbers for timestamp and fallback shapes
          activities.map((a) => ({
            ...a,
            timestamp:
              typeof a.timestamp === "number"
                ? a.timestamp
                : new Date(a.timestamp as string).getTime(),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch activity logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [startDate, endDate]);

  return (
    <Card className="h-full w-full border border-[var(--primary)]">
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
          <DatePicker
            value={startDate ?? undefined}
            onChange={(d) => {
              setStartDate(d ?? null);
              // reset end date if it's before new start
              if (d && endDate && endDate < d) setEndDate(null);
            }}
            label="Start date"
          />
          <DatePicker
            value={endDate ?? undefined}
            onChange={(d) => setEndDate(d ?? null)}
            disabled={!startDate}
            label="End date"
          />
        </div>

        <ScrollArea className="flex-1 min-h-0">
          {loading ? <div className="p-4">Loading...</div> : null}
          <LogsClient
            logs={React.useMemo(() => {
              // when both dates set -> filter between start (00:00) and end (23:59:59.999)
              if (startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                return logs.filter(
                  (l) =>
                    l.timestamp >= start.getTime() &&
                    l.timestamp <= end.getTime()
                );
              }

              // otherwise sort by most recent first
              return [...logs].sort((a, b) => b.timestamp - a.timestamp);
            }, [logs, startDate, endDate])}
            search={search}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Activity;
