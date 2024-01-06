import { z } from "zod";

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .min(2, "二文字以上の名前を入力してください"),
});
