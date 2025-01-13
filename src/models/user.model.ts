import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'instructor';
  image?: string;
  googleId?: string;
  favorites: mongoose.Types.ObjectId[]; // Favorite courses
  enrolledCourses: {
    courseId: mongoose.Types.ObjectId;
    progress: number;
    lastAccessed: Date;
    completed: boolean;
    certificateIssued?: boolean;
  }[];
  profile: {
    bio?: string;
    location?: string;
    interests?: string[];
    socialLinks?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
    skills?: string[];
    achievements?: {
      certificateId: mongoose.Types.ObjectId;
      issuedAt: Date;
      name: string;
    }[];
  };
  settings: {
    language: string;
    emailNotifications: boolean;
    theme: 'light' | 'dark';
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'instructor'],
      default: 'user',
    },
    image: String,
    googleId: String,
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    enrolledCourses: [{
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      },
      progress: {
        type: Number,
        default: 0
      },
      lastAccessed: Date,
      completed: {
        type: Boolean,
        default: false
      },
      certificateIssued: {
        type: Boolean,
        default: false
      }
    }],
    profile: {
      bio: String,
      location: String,
      interests: [String],
      socialLinks: {
        linkedin: String,
        github: String,
        twitter: String
      },
      skills: [String],
      achievements: [{
        certificateId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Certificate'
        },
        issuedAt: Date,
        name: String
      }]
    },
    settings: {
      language: {
        type: String,
        default: 'en'
      },
      emailNotifications: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
      }
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
