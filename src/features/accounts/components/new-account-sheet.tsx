import { AccountForm } from "@/features/accounts/components/account-form";
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

  function onSubmit(values: FormValues) {
    console.log({ values });
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
          disabled={false}
          defaultValues={{ name: "Bank" }}
        />
      </SheetContent>
    </Sheet>
  );
}
