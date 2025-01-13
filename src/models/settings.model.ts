import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  security: {
    maxLoginAttempts: {
      type: Number,
      required: true,
      default: 5,
    },
    sessionTimeout: {
      type: Number,
      required: true,
      default: 30,
    },
    requireEmailVerification: {
      type: Boolean,
      required: true,
      default: true,
    },
    twoFactorAuthEnabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    passwordExpiryDays: {
      type: Number,
      required: true,
      default: 90,
    },
    ipWhitelist: {
      type: [String],
      default: [],
    },
    failedLoginLockoutMinutes: {
      type: Number,
      required: true,
      default: 30,
    },
  },
  features: {
    enableRegistration: {
      type: Boolean,
      required: true,
      default: true,
    },
    enablePublicCourses: {
      type: Boolean,
      required: true,
      default: true,
    },
    enableCertificates: {
      type: Boolean,
      required: true,
      default: true,
    },
    enableAIFeatures: {
      type: Boolean,
      required: true,
      default: true,
    },
    enableLiveClasses: {
      type: Boolean,
      required: true,
      default: false,
    },
    enableAnalytics: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  notifications: {
    enableEmailNotifications: {
      type: Boolean,
      required: true,
      default: true,
    },
    enableInAppNotifications: {
      type: Boolean,
      required: true,
      default: true,
    },
    notifyOnNewEnrollment: {
      type: Boolean,
      required: true,
      default: true,
    },
    notifyOnCourseCompletion: {
      type: Boolean,
      required: true,
      default: true,
    },
    notifyOnNewCourse: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  storage: {
    maxUploadSizeMB: {
      type: Number,
      required: true,
      default: 50,
    },
    allowedFileTypes: {
      type: [String],
      default: ['image/*', 'video/*', 'application/pdf'],
    },
    enableCloudStorage: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}, {
  timestamps: true,
});

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;
