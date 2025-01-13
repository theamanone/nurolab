import { NextRequest, NextResponse } from 'next/server';
import { ApiKey } from '@/models/api-key.model';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter is required' },
        { status: 400 }
      );
    }

    // Define available API endpoints
    const availableEndpoints = [
      {
        path: '/api/data/synthetic',
        methods: ['GET'],
        description: 'Generate synthetic data for testing',
        parameters: [
          { name: 'type', type: 'string', required: true, options: ['tabular', 'timeseries'] },
          { name: 'rows', type: 'number', required: false, default: 10 }
        ]
      }
      // Add more endpoints as they become available
    ];

    // Find the requested endpoint
    const endpointInfo = availableEndpoints.find(e => e.path === endpoint);
    if (!endpointInfo) {
      return NextResponse.json(
        { error: 'Endpoint not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      available: true,
      ...endpointInfo
    });
  } catch (error) {
    console.error('API endpoint check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
