"use client";

import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccountStore } from "@/features/accounts/hooks/use-new-accounts";

export default function DashboardPage() {
  const { data: accounts, isLoading } = useGetAccounts();
  const { onOpen } = useNewAccountStore();

  if (isLoading) return "Loading";

  return (
    <div>
      <h1>Dashboard page</h1>
      <Button onClick={onOpen}>Add an account</Button>
      <div>
        {accounts?.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div>
    </div>
  );
}
