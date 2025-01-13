import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Course from '@/models/course.model';

import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/config/dbConnect';

// GET /api/admin/courses
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const courses = await Course.find()
      .select('title shortDescription category level instructor status updatedAt')
      .sort({ updatedAt: -1 });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/courses
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await dbConnect();
    
    const course = new Course(data);
    await course.save();

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
