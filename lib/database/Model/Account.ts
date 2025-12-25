import mongoose, { Schema, Document, Model } from "mongoose";
import type { AccountType } from "@/app/(auth)/type/type";

export interface IAccount
  extends Document,
    Omit<AccountType, "confirmPassword"> {}

const AccountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["guide", "customer"] },
    isFirstTime: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
  },
  {
    timestamps: true,
  }
);

const AccountModel: Model<IAccount> =
  mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);
export default AccountModel;
