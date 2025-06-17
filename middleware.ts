import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { API_CONFIG } from './lib/constants';

// 简单的内存存储用于速率限制
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  // 只处理API请求
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // CORS处理
  const response = NextResponse.next();
  const origin = request.headers.get('origin') || '*';

  if (API_CONFIG.CORS.origin === '*' || API_CONFIG.CORS.origin === origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', API_CONFIG.CORS.methods.join(','));
    response.headers.set('Access-Control-Allow-Headers', API_CONFIG.CORS.allowedHeaders.join(','));
  }

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return response;
  }

  // 速率限制
  const ip = request.ip || 'unknown';
  const now = Date.now();
  const windowMs = API_CONFIG.RATE_LIMIT.windowMs;
  const max = API_CONFIG.RATE_LIMIT.max;

  const rateLimitInfo = rateLimit.get(ip);
  if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
  } else if (rateLimitInfo.count >= max) {
    return new NextResponse(
      JSON.stringify({ error: '请求过于频繁，请稍后再试' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((rateLimitInfo.resetTime - now) / 1000).toString(),
        },
      }
    );
  } else {
    rateLimitInfo.count++;
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
}; 