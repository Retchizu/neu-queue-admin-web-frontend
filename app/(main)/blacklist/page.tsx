"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types/employee";
import BlacklistClient from "./_components/blacklist-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useVerifyUser } from "@/hooks/useVerifyUser";

const Blacklist = () => {
  useVerifyUser();
  const employees: Employee[] = React.useMemo(() => {
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

  const [search, setSearch] = React.useState("");
  const [blacklist, setBlacklist] = React.useState<
    {
      email: string;
      reason: string;
    }[]
  >([]);

  // dialog form state
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  function resetForm() {
    setEmail("");
    setReason("");
    setError(null);
  }

  function handleAdd() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return setError("Email is required");
    if (!trimmed.endsWith("@neu.edu.ph"))
      return setError("Email must end with @neu.edu.ph");

    if (blacklist.some((b) => b.email.toLowerCase() === trimmed))
      return setError("This email is already blacklisted");

    setBlacklist((s) => [{ email: trimmed, reason }, ...s]);
    setOpen(false);
    resetForm();
  }

  function handleRemove(emailToRemove: string) {
    setBlacklist((s) => s.filter((b) => b.email !== emailToRemove));
  }

  return (
    <Card className="h-full w-full">
      <CardContent className="flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for blacklisted users..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="ml-2">
            <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
              <DialogTrigger asChild>
                <Button>Blacklist a user</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Blacklist a user</DialogTitle>
                  <DialogDescription>
                    Add a user to the blacklist. Email must end with
                    <code className="mx-1">@neu.edu.ph</code>
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2 py-4">
                  <div className="grid gap-1">
                    <label
                      className="text-sm font-medium"
                      htmlFor="blacklist-email"
                    >
                      Email
                    </label>
                    <Input
                      id="blacklist-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@neu.edu.ph"
                    />
                  </div>

                  <div className="grid gap-1">
                    <label
                      className="text-sm font-medium"
                      htmlFor="blacklist-reason"
                    >
                      Reason
                    </label>
                    <Textarea
                      id="blacklist-reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-destructive">{error}</div>
                  )}
                </div>

                <DialogFooter>
                  <div className="flex w-full justify-end gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOpen(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAdd}>Add</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <BlacklistClient
            employees={employees}
            search={search}
            list={blacklist}
            onRemove={handleRemove}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Blacklist;
