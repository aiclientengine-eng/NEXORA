import { NextResponse } from "next/server";
import { destroyCurrentSession } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    await destroyCurrentSession();
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (acceptsHtml) return NextResponse.redirect(new URL("/", request.url));
    return Response.json({ data: { success: true } });
  } catch (error) {
    console.error("logout_error", error);
    return Response.json({ error: { code: "INTERNAL_ERROR", message: "Logout failed." } }, { status: 500 });
  }
}
