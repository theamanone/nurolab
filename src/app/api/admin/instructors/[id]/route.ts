import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/user.model';
import { connectToDatabase } from '@/lib/db';

// GET /api/admin/instructors/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const instructor = await User.findOne({ _id: params.id, role: 'instructor' });
    
    if (!instructor) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
    }

    return NextResponse.json(instructor);
  } catch (error) {
    console.error('Error fetching instructor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/instructors/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();
    
    const instructor = await User.findOneAndUpdate(
      { _id: params.id, role: 'instructor' },
      data,
      { new: true }
    );
    
    if (!instructor) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
    }

    return NextResponse.json(instructor);
  } catch (error) {
    console.error('Error updating instructor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/instructors/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const instructor = await User.findOneAndDelete({ _id: params.id, role: 'instructor' });
    
    if (!instructor) {
      return NextResponse.json({ error: 'Instructor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    console.error('Error deleting instructor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
