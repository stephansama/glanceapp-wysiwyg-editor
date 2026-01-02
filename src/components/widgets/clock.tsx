import * as z from "zod";

import { Handle } from "@/components/swapy";
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

export type TimeZoneSchema = z.input<typeof timeZoneSchema>;
export const timeZoneSchema = z.object({
  label: z.string(),
  timezone: z.string(),
});

export type ClockSchema = z.input<typeof clockSchema>;
export const clockSchema = z
  .object({
    hourFormat: z.enum(["24h", "12h"]),
    timezones: z.array(timeZoneSchema),
    type: z.literal("clock"),
  })
  .transform((schema) => ({ ...schema, ["hour-format"]: schema.hourFormat }));

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

// https://github.com/glanceapp/glance/blob/6c5b7a3f4cc409e31739b2914bb6636d08299126/docs/configuration.md#clock
export function Clock() {
  const form = useAppForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onBlur: formSchema,
    },
    onSubmit: () => {
      //
    },
  });

  return (
    <Dialog>
      <form
        onSubmit={(e) => {
          console.log("submitted");
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <DialogTrigger asChild>
          <div className="h-40 w-full rounded-md p-4 relative bg-green-200">
            <Handle>
              <img
                src="https://api.iconify.design/formkit:draghandle.svg"
                alt=""
              />
            </Handle>
            <Button variant="outline">Open Dialog</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <form.AppField name="title">
                {(field) => <field.TextField label="title" />}
              </form.AppField>
            </div>
            <div className="grid gap-3">
              <form.AppField name="description">
                {(field) => <field.TextField label="description" />}
              </form.AppField>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form.AppForm>
              <form.SubscribeButton label="save changes" />
            </form.AppForm>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
