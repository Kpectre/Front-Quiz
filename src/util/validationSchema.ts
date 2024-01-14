import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(6, "六文字以下の名前を入力してください"),
});
