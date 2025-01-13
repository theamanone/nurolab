import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import dbConnect from '@/config/dbConnect';
import Course from '@/models/course.model';
import User from '@/models/user.model';
import Enrollment from '@/models/enrollment.model';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Get counts from database
    const [totalCourses, totalInstructors, totalStudents, totalEnrollments] = await Promise.all([
      Course.countDocuments(),
      User.countDocuments({ role: 'instructor' }),
      User.countDocuments({ role: 'user' }),
      Enrollment.countDocuments(),
    ]);

    return NextResponse.json({
      totalCourses,
      totalInstructors,
      totalStudents,
      totalEnrollments,
    });
  } catch (error) {
    console.error('Error in dashboard stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
