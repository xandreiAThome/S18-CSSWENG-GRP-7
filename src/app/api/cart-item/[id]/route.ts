import { deleteCartItem, getCartItem } from "@/features/cart-item/services/crud";

/**
 * GET /api/cart_item/[id]
 *
 * Retrieves all cart items for a given user ID
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return getCartItem(req, { params: { userId: params.id } });
}

/**
 * DELETE /api/cart_item/[id]
 *
 * Deletes all cart items for a given user ID
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return deleteCartItem(req, { params: { userId: params.id } });
}
