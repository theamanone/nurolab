'use server';

import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { ApiKey } from '@/models/api-key.model';

// Helper function to serialize MongoDB documents
function serializeApiKey(doc: any) {
  return {
    id: doc._id.toString(),
    key: doc.key,
    name: doc.name,
    userId: doc.userId,
    createdAt: doc.createdAt.toISOString(),
    lastUsed: doc.lastUsed.toISOString(),
    isActive: doc.isActive
  };
}

export async function validateApiKey(apiKey: string) {
  const response = await fetch('/api/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to validate API key');
  }

  return response.json();
}

export async function generateApiKey(name: string = 'Default Key') {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const apiKey = `nuro_${nanoid(32)}`;
  
  const key = await ApiKey.create({
    key: apiKey,
    name,
    userId: session.user.email,
  });
  
  return serializeApiKey(key);
}

export async function getUserApiKeys() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const keys = await ApiKey.find({ 
    userId: session.user.email 
  }).sort({ createdAt: -1 });

  return keys.map(serializeApiKey);
}

export async function deleteApiKey(id: string) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  await ApiKey.deleteOne({
    _id: id,
    userId: session.user.email,
  });
}

export async function updateApiKeyName(id: string, name: string) {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  const key = await ApiKey.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.email,
    },
    { name },
    { new: true }
  );

  return key ? serializeApiKey(key) : null;
}

export async function checkEndpoint(endpoint: string) {
  const response = await fetch(`/api/check?endpoint=${encodeURIComponent(endpoint)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to check endpoint');
  }

  return response.json();
}

export async function getApiUsage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  // TODO: Implement actual usage tracking
  return {
    total: 100,
    remaining: 50,
    limit: 100,
    resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}
