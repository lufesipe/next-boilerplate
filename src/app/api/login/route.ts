import type { PrismaError } from '@/lib/prisma/types';
import { LoginPayload } from '@/services/http/server/login';

export async function POST(req: Request) {
  const body = (await req.json()) as LoginPayload;

  try {
    return new Response(JSON.stringify(body), { status: 200 });
  } catch (error) {
    console.error('Error fetching user', error);
    const err = error as PrismaError;
    return new Response(JSON.stringify({ message: err.name }), { status: 400 });
  }
}
