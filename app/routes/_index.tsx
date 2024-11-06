import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import FormMessage from "./FromMessage";
import { upload } from "../services/upload";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const textInput = formData.get("textInput");
  const fileInput = formData.get("fileInput");

  // if (fileInput) {
  //   const res = await upload(fileInput);
  //   console.log(res);
  // }

  if (
    typeof textInput !== "string" ||
    !fileInput ||
    !(fileInput instanceof File)
  ) {
    return json({ error: "Invalid form submission" });
  }

  return json({ success: true, textInput });
};
type ActionData = {
  error?: string;
  success?: boolean;
};
export default function UploadPage() {
  const actionData = useActionData<ActionData>();

  const [value, setValue] = useState({
    startDate: null,

    endDate: null,
  });

  return <FormMessage />;
}
