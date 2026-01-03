import mongoose, { Schema } from "mongoose";

const ClientSchema: Schema = new Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
    unique: true,
  },

  profileURL: { type: String, default: "default url from db" },
  phone: { type: Number, default: 0 },

  bio: {
    type: String,
    default: "Default Bio from the db to guide",
    requried: true,
  },

  languages: { type: [String], default: ["no Languages yet"] },
});

const ClientModel =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);
export default ClientModel;
