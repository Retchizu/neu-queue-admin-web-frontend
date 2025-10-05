"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types/employee";
import React, { useState } from "react";
import EmployeesClient from "./_components/employees-client";

const EmployeesPage = () => {
  const employees: Employee[] = [
    {
      id: "e_01",
      name: "Kenji Nakamura",
      email: "kenji.nakamura@neu.edu.ph",
      role: "Admin",
      createdAt: "2024-09-01T10:12:34.000Z",
    },
    {
      id: "e_02",
      name: "Abe Johnson",
      email: "abe.johnson@neu.edu.ph",
      role: "Cashier",
      createdAt: "2024-11-15T08:25:00.000Z",
    },
    {
      id: "e_03",
      name: "Monserrat Diaz",
      email: "monserrat.diaz@neu.edu.ph",
      role: "Information",
      createdAt: "2025-02-20T14:05:12.000Z",
    },
    {
      id: "e_04",
      name: "Silas Bennett",
      email: "silas.bennett@neu.edu.ph",
      role: "Cashier",
      createdAt: "2025-05-03T09:40:00.000Z",
    },
    {
      id: "e_05",
      name: "Carmella Ruiz",
      email: "carmella.ruiz@neu.edu.ph",
      role: "Information",
      createdAt: "2025-07-22T19:18:45.000Z",
    },
  ];

  const [search, setSearch] = useState("");

  return (
    <Card className="h-full w-full">
      <CardContent className="">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for employees..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="ml-auto">Add employee</Button>
        </div>
        <EmployeesClient employees={employees} search={search} />
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
