import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useNewAccountStore } from "@/features/accounts/hooks/use-new-accounts";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema;
type FormValues = z.input<typeof formSchema>;

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccountStore();
  const { mutate: createAccount, isPending } = useCreateAccount();

  // TODO: Maybe move this functionality down to the form itself rather than passing it down as props... not sure if I'll reuse this AccountForm or not
  function onSubmit(values: FormValues) {
    createAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={isPending}
          defaultValues={{ name: "Bank" }}
        />
      </SheetContent>
    </Sheet>
  );
}
