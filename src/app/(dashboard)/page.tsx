"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function DashboardPage() {
  const { data: accounts, isLoading } = useGetAccounts();

  if (isLoading) return "Loading";

  return (
    <div>
      <h1>Dashboard page</h1>
      <div>
        {accounts?.map((account) => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div>
    </div>
  );
}
