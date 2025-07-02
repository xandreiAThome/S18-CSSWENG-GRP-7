import { deleteProduct, getProduct } from "@features/product/services/crud";
import { validateIdParam } from "@/lib/utils";

/**
 * GET /api/product/[id]
 *
 * Gets a product's information based on the dynamic `id` parameter in the URL path.
 * Example request: GET /api/product/123
 * 
 * Route param:
 * - id (string): product ID passed as part of the URL (e.g., /api/product/123)
 * 
 * Response:
 * - 200 OK: Returns product information
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If product is not found
 */
export async function GET(req: Request, { params }: {params: {id: string } }) {
  const id = validateIdParam(params.id)
  if (id instanceof Response) {
    return id;
  } else {
    return getProduct(id);
  }
}

/**
 * DELETE /api/product/[id]
 *
 * Deletes a product based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/product/123
 * 
 * Route param:
 * - id (string): product ID passed as part of the URL (e.g., /api/product/123)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If product is not found
 */
export async function DELETE(req: Request, { params }: {params: {id: string } }) {
  const id = validateIdParam(params.id)
  if (id instanceof Response) {
    return id;
  } else {
    return deleteProduct(id);
  }
}