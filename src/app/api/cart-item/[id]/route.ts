import { validateIdParam } from "@/lib/utils";
import { getCartItem, deleteCartItem } from "@features/cart-item/services/crud";

/**
 * GET /api/cart-item/[id]
 *
 * Retrieves cart-item information based on the dynamic `id` parameter in the URL path.
 * Example request: GET /api/cart-item/123
 * 
 * Route param:
 * - id (string): cart-item ID passed as part of the URL (e.g., /api/cart-item/123)
 * 
 * Response:
 * - 200 OK: Returns cart-item data
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If cart-item is not found
 */
export async function GET(
  req: Request,
  { params }: {
    params: {
      id: string,
      sortBy: string,
      sortOrder: string
    }
  }) {
  const id = validateIdParam((await params).id)
  if (id instanceof Response) {
    return id;
  } else {
    return getCartItem(id, params.sortBy, params.sortOrder);
  }
}

/**
 * DELETE /api/cart-item/[id]
 *
 * Deletes a cart-item based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/cart-item/123
 * 
 * Route param:
 * - id (string): cart-item ID passed as part of the URL (e.g., /api/cart-item/123)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If cart-item is not found
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = validateIdParam((await params).id)
  if (id instanceof Response) {
    return id;
  } else {
    return deleteCartItem(id);
  }
}
