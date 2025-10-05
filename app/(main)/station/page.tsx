import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import React from "react";

const Stations = () => {
  useVerifyUser();
  return <Card className="h-full w-full"></Card>;
};

export default Stations;
