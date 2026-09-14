import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: 'ready',
      service: 'nexora-api',
      database: 'connected',
      latencyMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        status: 'not_ready',
        service: 'nexora-api',
        database: 'unavailable',
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
