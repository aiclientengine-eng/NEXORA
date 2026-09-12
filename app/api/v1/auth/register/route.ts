import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../../../../lib/prisma";
import { createSession } from "../../../../../lib/auth";

const schema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(12).max(128),
  displayName: z.string().trim().min(2).max(80).optional(),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: { code: "VALIDATION_ERROR", message: "Enter a valid email and a password of at least 12 characters." } }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: { code: "ACCOUNT_EXISTS", message: "An account with that email already exists." } }, { status: 409 });
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, displayName: parsed.data.displayName },
      select: { id: true, email: true, displayName: true, role: true, createdAt: true },
    });

    await createSession(user.id);
    return Response.json({ data: { user } }, { status: 201 });
  } catch (error) {
    console.error("registration_error", error);
    return Response.json({ error: { code: "INTERNAL_ERROR", message: "Registration is temporarily unavailable." } }, { status: 500 });
  }
}
