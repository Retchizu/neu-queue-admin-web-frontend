"use client";

import React from "react";
import AnalyticsChart from "./_components/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const events = [
  {
    date: 15,
    description: "Zoom meeting with Cholo",
    location: "via Zoom",
    timeStart: "09:00",
    timeEnd: "10:00",
  },
  {
    date: 16,
    description: "Psychological Test",
    location: "New Era University",
    timeStart: "09:00",
    timeEnd: "10:00",
  },
  {
    date: 18,
    description: "Passport Application w/ babi",
    location: "Ortigas DFA",
    timeStart: "09:00",
    timeEnd: "10:00",
  },
];

const Analytics = () => {
  return (
    <div className="h-full w-full">
      <AnalyticsChart />
    </div>
  );
};

export default Analytics;
