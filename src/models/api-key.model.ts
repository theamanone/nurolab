import { Schema, model, models, Document } from 'mongoose';

export interface IApiKey extends Document {
  key: string;
  name: string;
  userId: string;
  createdAt: Date;
  lastUsed: Date;
  isActive: boolean;
}

const apiKeySchema = new Schema<IApiKey>({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

export const ApiKey = models.ApiKey || model<IApiKey>('ApiKey', apiKeySchema);
