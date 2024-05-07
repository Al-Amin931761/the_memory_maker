import { z } from "zod";

// contact schema
export const contactSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(1, { message: "Name field is required" })
    .regex(/^[A-Za-z\s\-\.]+$/, "Name must contain only letters"),

  user_email: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message field is required" }).trim(),
});

export const addAndUpdateReviewSchema = z.object({
  review: z.string().min(1, { message: "Review field is required" }).trim(),
});
