import mongoose, { Document, Schema, Model } from "mongoose";

import { ITest, TestSchema } from "../../test/model"; // Adjust the import path as necessary

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  condition: string;
  testHist: ITest[];
  gender: string;
  age: number;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    condition: { type: String },
    testHist: [{ type: TestSchema, required: true }],
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    education: { type: String , required: true},
    work: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
