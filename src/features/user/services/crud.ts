import pool from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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
export async function addUser(req: Request) {
  const { id, name, address } = await req.json();

  // Basic validation
  if (!id || !name || !address) {
    return Response.json(
      { message: "Invalid input: Payload field/s missing" },
      { status: 400 }
    );
  }
  const userIdNum = Number(id);
  if (!id || isNaN(userIdNum)) {
    return Response.json(
      { message: "Invalid input: id is invalid" },
      { status: 400 }
    );
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO user (id, name, address) VALUES (?, ?, ?)",
        [userIdNum, name, address]
      );
      if (result.affectedRows === 0) {
        return Response.json({ status: 500, message: "Internal Server Error" });
      }
      return Response.json({message: "User created successfully"}, {status: 200});
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error("DB Error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return Response.json({message: "Duplicate Entry Error"}, {status: 409});
    } else {
      return Response.json({message: "Internal Server Error"}, {status: 500});
    }
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

export async function deleteUser(req: Request, { params }: { params: { id: string } }) {
 // Basic validation
  const id: string | null = params.id;
  if (id === null) {
    return Response.json(
      { message: "Missing required parameter: id" },
      { status: 400 }
    );
  }
  const userIdNum = Number(id);
  if (!Number.isInteger(userIdNum)) {
    return Response.json(
      { message: "Invalid input: id is invalid" },
      { status: 400 }
    );
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM user WHERE id = ?",
        [userIdNum]
      );
      if (result.affectedRows > 0) {
        return Response.json({message: "Item successfully deleted"}, {status: 200});
      } else {
        return Response.json({message: "Nothing to delete"}, {status: 404});
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    Response.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

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
export async function getUser(req: Request, { params }: { params: { id: string } }) {
  // Basic validation
  const id: string | null = params.id;
  if (id === null) {
    return Response.json(
      { message: "Missing required parameter: id" },
      { status: 400 }
    );
  }
  const userIdNum = Number(id);
  if (!Number.isInteger(userIdNum)) {
    return Response.json(
      { message: "Invalid input: id is invalid" },
      { status: 400 }
    );
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<RowDataPacket[]>(
        "SELECT * FROM user WHERE id = ?",
        [userIdNum]
      );

      const user = users[0];
      if (!user) {
        return Response.json({ message: "User not found" }, { status: 400 });
      }

      return Response.json({ user: user }, { status: 200 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
