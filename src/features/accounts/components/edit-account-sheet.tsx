import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccountStore } from "../hooks/use-open-account";
import { useEditAccount } from "../api/use-edit-account";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useGetAccount } from "../api/use-get-account";
import { Loader2Icon } from "lucide-react";

const formSchema = insertAccountSchema;
type FormValues = z.input<typeof formSchema>;

export function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccountStore();
  const { data, isLoading } = useGetAccount(id);

  const { mutate: editAccount, isPending } = useEditAccount(id);

  // TODO: Maybe move this functionality down to the form itself rather than passing it down as props... not sure if I'll reuse this AccountForm or not
  function onSubmit(values: FormValues) {
    editAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="py-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={{ name: data?.name ?? "" }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
