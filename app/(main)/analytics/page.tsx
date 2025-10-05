"use client";

import { useVerifyUser } from "@/hooks/useVerifyUser";
import React from "react";

const Analytics = () => {
  useVerifyUser();
  return <div>view-analytics</div>;
};

export default Analytics;
