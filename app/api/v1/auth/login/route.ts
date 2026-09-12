import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../../../../lib/prisma";
import { createSession } from "../../../../../lib/auth";

const schema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: { code: "VALIDATION_ERROR", message: "Enter a valid email and password." } }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    const valid = user?.passwordHash ? await compare(parsed.data.password, user.passwordHash) : false;
    if (!user || !valid || user.suspendedAt || user.deletedAt) {
      return Response.json({ error: { code: "INVALID_CREDENTIALS", message: "Email or password is incorrect." } }, { status: 401 });
    }

    await createSession(user.id);
    return Response.json({ data: { user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role } } });
  } catch (error) {
    console.error("login_error", error);
    return Response.json({ error: { code: "INTERNAL_ERROR", message: "Login is temporarily unavailable." } }, { status: 500 });
  }
}
