import { deleteCartItem } from "@/features/cart-item/services/crud";
import { validateIdParam } from "@/lib/utils";

/**
 * DELETE /api/cart-item/[id]
 *
 * Deletes a cart-item based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/cart-item/123
 * 
 * Route param:
 * - user (string): user ID passed as part of the URL (e.g., /api/cart-item/123/1)
 * - item (string): cart-item ID passed as part of the URL (e.g., /api/cart-item/123/1)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If input is invalid 
 * - 404 Not Found: If cart-item is not found
 */
export async function DELETE(req: Request, { params }: { params: { user: string, item: string} }) {
  const user = validateIdParam((await params).user)
  const item = validateIdParam((await params).item)

  if (user instanceof Response) {
    return user;
  } else if (item instanceof Response) {
    return item;
  } else {
    return deleteCartItem(user, item);
  }
}
