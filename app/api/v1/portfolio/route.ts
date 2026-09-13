import { jsonError, jsonOk } from '../../../../../lib/api-response';
import { requireUser } from '../../../../../lib/rbac';

export async function GET() {
  try {
    const user = await requireUser();

    return jsonOk({
      userId: user.id,
      mode: 'PERSISTED_READY',
      totalValue: null,
      assets: [],
      message: 'Portfolio persistence is ready for wallet and transaction data.',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHENTICATED') {
      return jsonError('UNAUTHENTICATED', 'Authentication is required.', 401);
    }
    console.error('portfolio_error', error);
    return jsonError('INTERNAL_ERROR', 'Unable to load portfolio.', 500);
  }
}
