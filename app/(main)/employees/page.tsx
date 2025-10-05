"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types/employee";
import React, { useEffect, useState } from "react";
import EmployeesClient from "./_components/employees-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await api.get("/admin/employees");
        setEmployees(response.data.employees);
      } catch (error) {
        console.error(error);
      }
    };
    getEmployees();
  }, []);
  console.log(employees);

  /* const employees: Employee[] = React.useMemo(() => {
    const roles: Employee["role"][] = ["Admin", "Cashier", "Information"];
    const firstNames = [
      "Kenji",
      "Abe",
      "Monserrat",
      "Silas",
      "Carmella",
      "Lina",
      "Rico",
      "Nadia",
      "Oscar",
      "Bea",
      "Hector",
      "Maya",
    ];
    const lastNames = [
      "Nakamura",
      "Johnson",
      "Diaz",
      "Bennett",
      "Ruiz",
      "Lopez",
      "Garcia",
      "Santos",
      "Reyes",
      "Tan",
      "Cruz",
      "Delgado",
    ];

    const count = 50;
    const now = Date.now();

    return Array.from({ length: count }).map((_, i) => {
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const name = `${fn} ${ln}`;
      const id = `e_${String(i + 1).padStart(3, "0")}`;
      const role = roles[i % roles.length];
      const createdAt = new Date(now - i * 1000 * 60 * 60 * 24).toISOString();
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@neu.edu.ph`;

      return {
        id,
        name,
        email,
        role,
        createdAt,
      } as Employee;
    });
  }, []);
 */
  const [search, setSearch] = useState("");
  
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Employee Management</CardTitle>
        <CardDescription>
          Assign roles to each users for the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for employees..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <EmployeesClient employees={employees} search={search} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
