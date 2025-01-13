import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { rateLimit } from '@/lib/rate-limit';
import { faker } from '@faker-js/faker/locale/en';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting
    const limiter = await rateLimit(req);
    if (!limiter.success) {
      return NextResponse.json(
        { error: limiter.message },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const rows = parseInt(searchParams.get('rows') || '10');

    if (!type) {
      return NextResponse.json(
        { error: 'Missing type parameter' },
        { status: 400 }
      );
    }

    // Generate mock data based on type
    let data;
    switch (type) {
      case 'tabular':
        data = Array.from({ length: rows }, () => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          age: faker.number.int({ min: 18, max: 80 }),
          city: faker.location.city()
        }));
        break;
      
      case 'timeseries':
        data = Array.from({ length: rows }, (_, i) => ({
          timestamp: new Date(Date.now() - i * 3600000).toISOString(),
          value: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
          category: faker.helpers.arrayElement(['A', 'B', 'C'])
        }));
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid data type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Synthetic data generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
