export function jsonOk<T>(data: T, init?: ResponseInit) {
  return Response.json({ data }, init);
}

export function jsonError(code: string, message: string, status = 400, details?: unknown) {
  return Response.json(
    { error: { code, message, ...(details === undefined ? {} : { details }) } },
    { status },
  );
}

export function getRequestId(request: Request) {
  return request.headers.get('x-request-id') ?? crypto.randomUUID();
}
