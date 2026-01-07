import mongoose, { Document, Schema, Model } from "mongoose";
import type { ReviewType } from "@/app/(guide)/guide-profile/type/type";

export interface IReview extends Document, ReviewType {}

const reviewSchema: Schema = new Schema({
  rating: { type: Number, default: 0 },
  comment: { type: String, default: "" },
  date: { type: String, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: [true, "Client ID is missing"],
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
    required: [true, "Guide ID is missing"],
  },
});

const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);
export default ReviewModel;
