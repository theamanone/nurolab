import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  certificateNumber: string;
  issueDate: Date;
  completionDate: Date;
  grade?: string;
  score?: number;
  metadata: {
    courseDuration: number;
    completionTime: number;
    skills: string[];
  };
  template: {
    name: string;
    data: Record<string, any>;
  };
  status: 'draft' | 'issued' | 'revoked';
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    grade: String,
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    metadata: {
      courseDuration: {
        type: Number,
        required: true,
      },
      completionTime: {
        type: Number,
        required: true,
      },
      skills: [String],
    },
    template: {
      name: {
        type: String,
        required: true,
      },
      data: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['draft', 'issued', 'revoked'],
      default: 'draft',
    },
    validUntil: Date,
  },
  {
    timestamps: true,
  }
);

// Generate unique certificate number before saving
certificateSchema.pre('save', function(next) {
  if (this.isNew) {
    const prefix = 'NURO';
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.certificateNumber = `${prefix}-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', certificateSchema);
