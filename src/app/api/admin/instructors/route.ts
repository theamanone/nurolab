import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '@/models/user.model';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/config/dbConnect';
import courseModel from '@/models/course.model';

// GET /api/admin/instructors
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const instructors = await User.find({ role: 'instructor' })
      .select('name email image profile.bio profile.specialization createdAt')
      .sort({ createdAt: -1 });

    // Get course count for each instructor
    const instructorsWithCourseCount = await Promise.all(
      instructors.map(async (instructor) => {
        const coursesCount = await courseModel.countDocuments({ 'instructor._id': instructor._id });
        return {
          ...instructor.toObject(),
          coursesCount
        };
      })
    );

    return NextResponse.json(instructorsWithCourseCount);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/instructors
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await dbConnect();
    
    // Create user with instructor role
    const instructor = new User({
      ...data,
      role: 'instructor'
    });
    await instructor.save();

    return NextResponse.json(instructor, { status: 201 });
  } catch (error) {
    console.error('Error creating instructor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
