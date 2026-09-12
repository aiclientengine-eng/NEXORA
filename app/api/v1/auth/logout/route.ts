import { destroyCurrentSession } from "../../../../../lib/auth";

export async function POST() {
  try {
    await destroyCurrentSession();
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("logout_error", error);
    return Response.json({ error: { code: "INTERNAL_ERROR", message: "Logout failed." } }, { status: 500 });
  }
}
