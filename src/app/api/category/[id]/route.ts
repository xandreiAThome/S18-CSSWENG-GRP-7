import { validateIdParam } from "@/lib/utils";
import { deleteCategory, getCategory } from "@features/category/services/crud";

/**
 * GET /api/category/[id]
 *
 * Retrieves category information based on the dynamic `id` parameter in the URL path.
 * Example request: GET /api/category/123
 * 
 * Route param:
 * - id (string): category ID passed as part of the URL (e.g., /api/category/123)
 * 
 * Response:
 * - 200 OK: Returns category data
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If category is not found
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = validateIdParam((await params).id)
  if (id instanceof Response) {
    return id;
  } else {
    return getCategory(id);
  }
}

/**
 * DELETE /api/category/[id]
 *
 * Deletes a category based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/category/123
 * 
 * Route param:
 * - id (string): category ID passed as part of the URL (e.g., /api/category/123)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If category is not found
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = validateIdParam((await params).id)
  if (id instanceof Response) {
    return id;
  } else {
    return deleteCategory(id);
  }
}
