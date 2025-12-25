export type AccountType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "guide" | "customer";
  isFirstTime: boolean;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
};
