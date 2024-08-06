"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccountStore } from "@/features/accounts/hooks/use-new-accounts";

import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./components/columns";

// const data = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 50,
//     status: "success",
//     email: "a@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 250,
//     status: "pending",
//     email: "d@example.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "z@example.com",
//   },
//   // ...
// ];

export default function AccountsPage() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { onOpen } = useNewAccountStore();

  if (isLoading) return "Loading";

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl linea-clamp-1">Accounts Page</CardTitle>
          <Button onClick={onOpen}>
            <PlusIcon className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts ?? []}
            filterKey="email"
            onDelete={() => null}
            disabled={false}
          />
        </CardContent>
      </Card>
      <div>
        {accounts?.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div>
    </div>
  );
}
