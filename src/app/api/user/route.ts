import { addUser } from "@features/user/services/crud"

/**
 * POST api/user
 *
 * Adds a user with fields matching `req`'s payload
 * @param {Request} req Incoming request containing:
 * - `id`: The id of the user
 * - `name`: The name of the user
 * - `address`: The address of the user
 * 
 * Response: 
 * - 200 OK: Successfully Added
 * - 400 Bad Request: If input fields is/are invalid
 * - 500 Not Found: If user cannot be created
 */
export async function POST(req: Request) {
  const { id, name, address } = await req.json();
  // Basic validation
  if (!id || !name || !address) {
    return Response.json(
      { message: "Invalid input: Payload field/s missing" },
      { status: 400 }
    );
  }
  const idNum = Number(id);
  if (!Number.isInteger(idNum)) {
    return Response.json(
      { message: "Invalid input: id is invalid" },
      { status: 400 }
    );
  }
  if (typeof name !== "string" || typeof address !== "string") {
    return Response.json(
      { message: "Invalid input: name and address must be strings" },
      { status: 400 }
    );
  } else if (name.length > 100) {
    return Response.json(
      { message: "Invalid input: name is too long" },
      { status: 400 }
    );
  } else if (address.length > 255) {
    return Response.json(
      { message: "Invalid input: address is too long" },
      { status: 400 }
    );
  }
  return addUser(idNum, name, address);
}