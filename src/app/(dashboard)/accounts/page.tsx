"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccountStore } from "@/features/accounts/hooks/use-new-accounts";

import { Loader2, PlusIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./components/columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

export default function AccountsPage() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { mutate: deleteAccounts, isPending } = useBulkDeleteAccounts();

  const { onOpen } = useNewAccountStore();

  if (isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="h-[450px] w-full grid place-items-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

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
            // Note: row.id simply returns the table ui component id, whereas row.original.id returns the id coming from the data we're passing down (in this case accounts)
            onDelete={(rows) => {
              deleteAccounts({ ids: rows.map((x) => x.original.id) });
            }}
            disabled={isPending || isLoading}
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
