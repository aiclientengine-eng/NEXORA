import { getCurrentUser } from "../../../../../lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return Response.json({ error: { code: "UNAUTHENTICATED", message: "Authentication required." } }, { status: 401 });
    }

    return Response.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          emailVerifiedAt: user.emailVerifiedAt,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("session_lookup_error", error);
    return Response.json({ error: { code: "INTERNAL_ERROR", message: "Unable to load your account." } }, { status: 500 });
  }
}
