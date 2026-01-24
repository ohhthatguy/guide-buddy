import { z } from "zod";

export const loginZodSchema = z.object({
  // email: z.email("Invalid Email"),
  email: z.string(),

  password: z.string().min(5, "Password must be at least 5 characters long"),
  //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  //   .regex(/[0-9]/, "Password must contain at least one number")
  //   .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const signUpZodSchema = z
  .object({
    name: z.string().min(3, "Name should be atleast 3 letters long"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/[0-9]/, "Password must contain at least one number")
    //   .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long"),
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/[0-9]/, "Password must contain at least one number")
    //   .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    email: z.email("Invalid Email"),
    role: z.enum(["guide", "customer"], "Please select one of the option"),
    isFirstTime: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
