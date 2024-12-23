import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  type: string;
  service: string;
  datetime: Date;
  price: number;
  machineId: mongoose.Types.ObjectId;
}

const serviceSchema = new Schema<IService>({
  type: { type: String, required: true },
  service: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  machineId: { type: Schema.Types.ObjectId, ref: 'Machine', required: true },
});

export const Service = mongoose.model<IService>('Service', serviceSchema);
