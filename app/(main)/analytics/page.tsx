"use client";

import React from "react";
import AnalyticsChart from "./_components/analytics-chart";
import { useVerifyUser } from "@/hooks/useVerifyUser";

const Analytics = () => {
  useVerifyUser();
  return (
    <div className="h-full w-full">
      <AnalyticsChart />
    </div>
  );
};

export default Analytics;
