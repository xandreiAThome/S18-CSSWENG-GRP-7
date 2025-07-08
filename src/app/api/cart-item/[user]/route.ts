import { getCartItem } from "@/features/cart-item/services/crud";
import { validateIdParam } from "@/lib/utils";

/**
 * GET /api/cart-item/[id]
 *
 * Retrieves cart-item information based on the dynamic `id` parameter in the URL path.
 * The `id` parameter will be treated as the user id tied to the cart-item
 * Example request: GET /api/cart-item/123
 * 
 * Route param:
 * - user (string): user ID passed as part of the URL (e.g., /api/cart-item/123)
 * 
 * Route query:
 * - sortBy (string): Field to sort by -- `"added_date"`, `"quantity"`, `"product_id"`
 * - sortOrder (string): Sort Direction -- `"ASC"`, `"DESC"`
 * 
 * Response:
 * - 200 OK: Returns cart-item data
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If cart-item is not found
 */
export async function GET(
  req: Request,
  { params }: { params: { user: string} }
) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy") || "added_date";
  const sortOrder = searchParams.get("sortOrder") || "ASC";

  const user = validateIdParam((await params).user);
  if (user instanceof Response) {
    return user;
  } else {
    return getCartItem(user, sortBy, sortOrder);
  }
}
