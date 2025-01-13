'use server';

export async function getCourses() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    return data.courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}
