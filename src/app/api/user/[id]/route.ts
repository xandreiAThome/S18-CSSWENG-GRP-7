import { validateIdParam } from "@/lib/utils";
import { deleteUser, getUser } from "@features/user/services/crud";

/**
 * GET /api/user/[id]
 *
 * Retrieves user information based on the dynamic `id` parameter in the URL path.
 * Example request: GET /api/user/123
 * 
 * Route param:
 * - id (string): User ID passed as part of the URL (e.g., /api/user/123)
 * 
 * Response:
 * - 200 OK: Returns user data
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If user is not found
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = validateIdParam(params.id)
  if (id instanceof Response) {
    return id;
  } else {
    return getUser(id);
  }
}

/**
 * DELETE /api/user/[id]
 *
 * Deletes a user based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/user/123
 * 
 * Route param:
 * - id (string): User ID passed as part of the URL (e.g., /api/user/123)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If user is not found
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = validateIdParam(params.id)
  if (id instanceof Response) {
    return id;
  } else {
    return deleteUser(id);
  }
}
