import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'machine-learning' | 'deep-learning' | 'computer-vision' | 'nlp' | 'data-science' | 'reinforcement-learning';
  subCategory?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  content: {
    modules: {
      title: string;
      description: string;
      order: number;
      lessons: {
        title: string;
        type: 'video' | 'text' | 'quiz' | 'project' | 'notebook';
        content: string;
        duration: number;
        order: number;
        resources: {
          type: 'pdf' | 'notebook' | 'dataset' | 'code' | 'link';
          title: string;
          url: string;
          description?: string;
        }[];
        quiz?: {
          questions: {
            question: string;
            options: string[];
            correctAnswer: number;
            explanation: string;
          }[];
        };
        project?: {
          description: string;
          objectives: string[];
          requirements: string[];
          starter_code?: string;
          solution_code?: string;
          evaluation_criteria: string[];
        };
      }[];
    }[];
  };
  instructor: {
    _id: Schema.Types.ObjectId;
    name: string;
    image: string;
    bio: string;
    expertise: string[];
  };
  requirements: string[];
  objectives: string[];
  thumbnail: string;
  previewVideo?: string;
  duration: number;
  rating: {
    average: number;
    count: number;
    reviews: {
      user: Schema.Types.ObjectId;
      rating: number;
      review: string;
      createdAt: Date;
    }[];
  };
  pricing: {
    price: number;
    currency: string;
    discountPrice?: number;
    discountEnds?: Date;
  };
  metadata: {
    enrolledStudents: number;
    completionRate: number;
    avgCompletionTime: number;
    lastUpdated: Date;
    language: string;
    tags: string[];
  };
  features: {
    hasProjects: boolean;
    hasCertificate: boolean;
    hasQuizzes: boolean;
    hasNotebooks: boolean;
    hasLiveSupport: boolean;
  };
  settings: {
    isPublished: boolean;
    enrollmentOpen: boolean;
    certificateTemplate?: string;
    allowPreview: boolean;
    requiresPrerequisites: boolean;
    prerequisites?: Schema.Types.ObjectId[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 200,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['machine-learning', 'deep-learning', 'computer-vision', 'nlp', 'data-science', 'reinforcement-learning'],
    },
    subCategory: String,
    level: {
      type: String,
      required: [true, 'Course level is required'],
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    topics: [String],
    content: {
      modules: [{
        title: {
          type: String,
          required: true,
        },
        description: String,
        order: {
          type: Number,
          required: true,
        },
        lessons: [{
          title: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
            enum: ['video', 'text', 'quiz', 'project', 'notebook'],
          },
          content: {
            type: String,
            required: true,
          },
          duration: Number,
          order: {
            type: Number,
            required: true,
          },
          resources: [{
            type: {
              type: String,
              enum: ['pdf', 'notebook', 'dataset', 'code', 'link'],
            },
            title: String,
            url: String,
            description: String,
          }],
          quiz: {
            questions: [{
              question: String,
              options: [String],
              correctAnswer: Number,
              explanation: String,
            }],
          },
          project: {
            description: String,
            objectives: [String],
            requirements: [String],
            starter_code: String,
            solution_code: String,
            evaluation_criteria: [String],
          },
        }],
      }],
    },
    instructor: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: String,
      bio: String,
      expertise: [String],
    },
    requirements: [String],
    objectives: [String],
    thumbnail: {
      type: String,
      required: [true, 'Course thumbnail is required'],
    },
    previewVideo: String,
    duration: {
      type: Number,
      required: [true, 'Course duration is required'],
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
      reviews: [{
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: Number,
        review: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }],
    },
    pricing: {
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'USD',
      },
      discountPrice: Number,
      discountEnds: Date,
    },
    metadata: {
      enrolledStudents: {
        type: Number,
        default: 0,
      },
      completionRate: {
        type: Number,
        default: 0,
      },
      avgCompletionTime: {
        type: Number,
        default: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
      language: {
        type: String,
        default: 'en',
      },
      tags: [String],
    },
    features: {
      hasProjects: {
        type: Boolean,
        default: false,
      },
      hasCertificate: {
        type: Boolean,
        default: true,
      },
      hasQuizzes: {
        type: Boolean,
        default: false,
      },
      hasNotebooks: {
        type: Boolean,
        default: false,
      },
      hasLiveSupport: {
        type: Boolean,
        default: false,
      },
    },
    settings: {
      isPublished: {
        type: Boolean,
        default: false,
      },
      enrollmentOpen: {
        type: Boolean,
        default: true,
      },
      certificateTemplate: String,
      allowPreview: {
        type: Boolean,
        default: true,
      },
      requiresPrerequisites: {
        type: Boolean,
        default: false,
      },
      prerequisites: [{
        type: Schema.Types.ObjectId,
        ref: 'Course',
      }],
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
