"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { Input } from "@/components/ui/input";
import PendingClient from "./_components/pending-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const Pending = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  type PendingUser = {
    uid: string;
    email?: string | null;
    name?: string | null;
    role?: string | null;
    createdAt?: string | null;
  };

  const fetchPendingUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/pending-users");
      const pending: PendingUser[] = res.data?.pendingUsers ?? [];
      const mapped: Employee[] = pending.map((p) => ({
        uid: p.uid,
        displayName: p.name ?? "-",
        email: p.email ?? "",
        role: String(p.role ?? "pending"),
        createdAt: p.createdAt ?? new Date().toISOString(),
      }));
      setEmployees(mapped);
    } catch (err: unknown) {
      const e = err as { message?: string } | undefined;
      toast.error(e?.message ?? "Failed to fetch pending users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPendingUsers();
  }, [fetchPendingUsers]);

  return (
    <Card className="h-full w-full border border-[var(--primary)]">
      <CardHeader>
        <CardTitle>Pending User Management</CardTitle>
        <CardDescription>Manage users and assign roles.</CardDescription>
      </CardHeader>

      <CardContent className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for users..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          />
        </div>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner className="w-6 h-6" />
          </div>
        ) : employees.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              All users have been reviewed.
              <div>No pending approvals.</div>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <PendingClient
              employees={employees}
              search={search}
              onAccept={async (uid: string, role: Employee["role"]) => {
                const found = employees.find((e) => e.uid === uid);
                const email = found?.email ?? uid;
                try {
                  await api.post("/admin/set-role", {
                    uid,
                    role: String(role).toLowerCase(),
                  });
                  toast.success(`${email} accepted as ${role}`);
                  await fetchPendingUsers();
                } catch (err: unknown) {
                  const e = err as {
                    response?: { data?: { message?: string } };
                    message?: string;
                  };
                  const msg =
                    e?.response?.data?.message ||
                    e?.message ||
                    "Failed to assign role";
                  toast.error(msg);
                }
              }}
            />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default Pending;
