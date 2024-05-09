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

// add and update review schema
export const addAndUpdateReviewSchema = z.object({
  review: z.string().min(1, { message: "Review field is required" }).trim(),
});

export const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(1, { message: "Password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),

  confirmNewPassword: z
    .string()
    .min(1, { message: "Confirm new password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
});

// update profile schema
export const updateProfileSchema = z.object({
  imageURL: z
    .string()
    .min(1, { message: "Image URL field is required" })
    .url()
    .trim(),

  phoneNumber: z
    .string()
    .min(1, { message: "Phone Number field is required" })
    .regex(
      /^0\d{10}$/,
      "Invalid phone number, please enter 11 digit phone number"
    ),

  address: z.string().min(1, { message: "Address field is required" }).trim(),
});

// add print schema
export const addAndUpdatePrintSchema = z.object({
  imageURL: z
    .string()
    .min(1, { message: "Image URL field is required" })
    .url()
    .trim(),
  name: z.string().min(1, { message: "Name field is required" }).trim(),

  location: z.string().min(1, { message: "Location field is required" }).trim(),
});

// customer details schema
export const customerDetailsSchema = z.object({
  country: z.string().min(1, { message: "Country field is required" }).trim(),

  address: z.string().min(1, { message: "Address field is required" }).trim(),

  city: z.string().min(1, { message: "City field is required" }).trim(),

  state: z.string().min(1, { message: "State field is required" }).trim(),

  postalCode: z.string().min(1, { message: "State field is required" }).trim(),

  phoneNumber: z
    .string()
    .min(1, { message: "Phone Number field is required" })
    .regex(
      /^0\d{10}$/,
      "Invalid phone number, please enter 11 digit phone number"
    ),
});

// login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),

  password: z.string().min(1, { message: "Email field is required" }),
});

// reset password schema
export const resetPasswordSchema = z.object({
  resetPasswordEmail: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),
});

// register schema
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name field is required" })
    .regex(/^[A-Za-z\s\-\.]+$/, "Name must contain only letters"),

  imageURL: z
    .string()
    .min(1, { message: "Image URL field is required" })
    .url()
    .trim(),

  email: z
    .string()
    .min(1, { message: "Email field is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(1, { message: "Password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),

  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password field is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
    ),
});
