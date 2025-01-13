import { NextResponse } from 'next/server';
import dbConnect from '@/config/dbConnect';

export async function GET() {
  try {
    await dbConnect();

    // Modern course data with engaging content
    const courses = [
      {
        id: 1,
        title: 'AI & Machine Learning Fundamentals',
        description: 'Master the core concepts of AI and ML with hands-on projects and real-world applications.',
        duration: '12 weeks',
        level: 'Beginner to Intermediate',
        image: '/assets/courses/ai-ml.jpg',
        topics: [
          'Neural Networks',
          'Deep Learning',
          'Computer Vision',
          'Natural Language Processing'
        ],
        features: [
          'Interactive Jupyter notebooks',
          'Real-world projects',
          'AI model deployment',
          'Certificate upon completion'
        ],
        price: 149.99,
        rating: 4.8,
        studentsEnrolled: 2500,
        instructor: {
          name: 'Dr. Sarah Chen',
          title: 'AI Research Scientist',
          image: '/assets/instructors/sarah-chen.jpg'
        }
      },
      {
        id: 2,
        title: 'Full-Stack Web Development Bootcamp',
        description: 'Build modern web applications with Next.js, React, and Node.js.',
        duration: '16 weeks',
        level: 'Intermediate',
        image: '/assets/courses/web-dev.jpg',
        topics: [
          'Modern JavaScript',
          'React & Next.js',
          'Node.js & Express',
          'Database Design'
        ],
        features: [
          'Portfolio projects',
          'Code reviews',
          'Industry mentorship',
          'Job placement assistance'
        ],
        price: 199.99,
        rating: 4.9,
        studentsEnrolled: 1800,
        instructor: {
          name: 'Alex Rivera',
          title: 'Senior Software Engineer',
          image: '/assets/instructors/alex-rivera.jpg'
        }
      },
      {
        id: 3,
        title: 'Data Science & Analytics',
        description: 'Learn to analyze data and derive meaningful insights using Python and advanced statistical methods.',
        duration: '10 weeks',
        level: 'Intermediate',
        image: '/assets/courses/data-science.jpg',
        topics: [
          'Python for Data Science',
          'Statistical Analysis',
          'Data Visualization',
          'Machine Learning'
        ],
        features: [
          'Real dataset analysis',
          'Business case studies',
          'Visualization tools',
          'Analytics portfolio'
        ],
        price: 179.99,
        rating: 4.7,
        studentsEnrolled: 2100,
        instructor: {
          name: 'Dr. Michael Park',
          title: 'Data Science Lead',
          image: '/assets/instructors/michael-park.jpg'
        }
      }
    ];

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Error in courses API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
