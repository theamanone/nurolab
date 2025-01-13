import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/config/dbConnect';
import User from '@/models/user.model';
import { generateToken } from '@/lib/jwt';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
    });

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    // Return response
    return NextResponse.json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
