import { getCurrentUser } from './auth';

export type AppRole = 'USER' | 'ADMIN' | 'DEVELOPER' | 'SUPPORT';

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('UNAUTHENTICATED');
  return user;
}

export async function requireRole(roles: AppRole[]) {
  const user = await requireUser();
  if (!roles.includes(user.role as AppRole)) throw new Error('FORBIDDEN');
  return user;
}
