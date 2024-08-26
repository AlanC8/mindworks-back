import { Schema, model, Document } from "mongoose";

export interface ITest extends Document {
  questions: string;
  options: string[];
}

export const TestSchema: Schema = new Schema<ITest>({
  questions: { type: String, required: true },
  options: { type: [String], required: true },
});

const TestMind = model<ITest>("Test", TestSchema);

export default TestMind;
