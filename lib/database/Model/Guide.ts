import mongoose, { Model, Schema, Document, Types } from "mongoose";
import { GuideType } from "@/app/(guide)/guide-profile/type/type";

export interface IGuide extends Document, GuideType {
  guideId: Types.ObjectId | any;
}

const GuideSchema: Schema = new Schema({
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },
  rating: { type: Number, default: 0 },
  speciality: { type: [String], default: [] },
  hourlyRate: { type: Number, default: 10, min: 10, max: 100 },
  profileURL: { type: String, default: "default url from db" },
  available: { type: Boolean, default: false },
  bio: {
    type: String,
    default: "Default Bio from the db to guide",
    requried: true,
  },
  location: {
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
  experience: { type: String, default: "No experience of new guide" },
  toursCompleted: { type: Number, default: 0 },
  responseTime: { type: String, deault: "30 min" },
  certifications: { type: [String], default: ["no certifications yet"] },
  languages: { type: [String], default: ["no Languages yet"] },
});

const GuideModel: Model<IGuide> =
  mongoose.models.Guide || mongoose.model<IGuide>("Guide", GuideSchema);
export default GuideModel;
