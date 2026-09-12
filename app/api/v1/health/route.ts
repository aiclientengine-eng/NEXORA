import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'nexora-api',
    environment: process.env.NODE_ENV ?? 'development',
    demoMode: process.env.DEMO_MODE !== 'false',
    timestamp: new Date().toISOString(),
  });
}
