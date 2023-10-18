import mongoose, { Schema, SchemaTypes } from "mongoose";

let userSchema = new Schema({
  fullname: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  caste: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    maxlength: 10,
  },
  password: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  matrimony_registered: {
    type: Number,
    defaultValue: false,
  },
  matrimony_registration: {
    type: SchemaTypes.ObjectId,
    ref: "Matrimony",
  },
});

let User = mongoose.model("User", userSchema);

export default User;
