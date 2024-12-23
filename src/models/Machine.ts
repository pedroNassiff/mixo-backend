import mongoose, { Document, Schema } from 'mongoose';

export interface IMachine extends Document {
  name: string;
  status: string;
  services: number;
  image: string; // URL de la imagen
}

const machineSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  services: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IMachine>('Machine', machineSchema);
