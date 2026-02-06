// models/address.model.js
import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },
  { timestamps: true }
);

export const Address = model("Address", addressSchema);
