import * as React from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppForm } from "@/lib/form";
import { useEditorState } from "@/lib/state";

const formSchema = z.object({
  name: z.string().min(1),
});

export function AddPageForm() {
  const state = useEditorState();
  const [open, setOpen] = React.useState(false);

  const form = useAppForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onBlur: formSchema,
      onSubmit: ({ value: { name } }) => {
        const found = state.pages.find((page) => page.name === name);
        if (!found) return null;
        return {
          fields: {
            name: "name is already defined",
          },
        };
      },
    },
    onSubmit: (props) => {
      setOpen(false);
      props.formApi.resetField("name");
      state.addPage({ columns: [], name: props.value.name });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <form
          onSubmit={(e) => {
            console.log("submitted");
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <form.AppField name="name">
                {(field) => <field.TextField label="name" />}
              </form.AppField>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
