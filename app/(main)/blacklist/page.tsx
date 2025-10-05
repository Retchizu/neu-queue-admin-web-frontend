"use client";

import { useVerifyUser } from "@/hooks/useVerifyUser";
import React from "react";

const Blacklist = () => {
  useVerifyUser();
  return <div>blacklisted</div>;
};

export default Blacklist;
