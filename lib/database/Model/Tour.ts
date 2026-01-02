import mongoose, { Document, Schema, Model } from "mongoose";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";

// 1. Ensure your interface extends Document
export interface ITour extends Document, TourDataType {}

const tourSchema: Schema = new Schema(
  {
    guide: {
      id: {
        type: mongoose.Schema.Types.ObjectId, // Use built-in ObjectId
        ref: "Guide", // Recommended: link to your User model
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    client: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        //   ref: "Customer", this is not yet ready in db
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      startTime: {
        type: String, // Good: '14:30' format
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    meetup_location: {
      type: {
        type: String,
        enum: ["Point"], // 'location.type' must be 'Point'
        default: "Point",
      },
      coordinates: {
        type: [Number], // [Longitude, Latitude]
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "REJECTED", "ACCEPTED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

const TourModel: Model<ITour> =
  mongoose.models.Tour || mongoose.model<ITour>("Tour", tourSchema);

export default TourModel;
