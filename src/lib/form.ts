import { createFormHook } from "@tanstack/react-form";

import {
  Select,
  SubscribeButton,
  TextArea,
  TextField,
  fieldContext,
  formContext,
} from "@/components/form";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: { SubscribeButton },
  fieldContext,
  formContext,
});
