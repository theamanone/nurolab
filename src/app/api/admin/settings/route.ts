import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/config/dbConnect';
import Settings from '@/models/settings.model';

// GET /api/admin/settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    let settings = await Settings.findOne();

    // If no settings exist, create default settings
    if (!settings) {
      settings = await Settings.create({
        security: {
          maxLoginAttempts: 5,
          sessionTimeout: 30,
          requireEmailVerification: true,
          twoFactorAuthEnabled: false,
          passwordExpiryDays: 90,
          ipWhitelist: [],
          failedLoginLockoutMinutes: 30,
        },
        features: {
          enableRegistration: true,
          enablePublicCourses: true,
          enableCertificates: true,
          enableAIFeatures: true,
          enableLiveClasses: false,
          enableAnalytics: true,
        },
        notifications: {
          enableEmailNotifications: true,
          enableInAppNotifications: true,
          notifyOnNewEnrollment: true,
          notifyOnCourseCompletion: true,
          notifyOnNewCourse: true,
        },
        storage: {
          maxUploadSizeMB: 50,
          allowedFileTypes: ['image/*', 'video/*', 'application/pdf'],
          enableCloudStorage: false,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error in settings GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/admin/settings
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await dbConnect();

    const settings = await Settings.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error in settings PUT:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
