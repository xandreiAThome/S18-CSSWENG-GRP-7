// TO BE CHANGED LATER (NOT DONE)

import pool from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";


/**
 * Adds a cart_item to the user
 * POST api/cart_item
 *
 * Adds a user with fields matching `req`'s payload
 * @param {Request} req Incoming request containing:
 * - `userId`: The id of the user
 * - `productId`: The name of the user
 * - `quantity`: The address of the user
 * 
 * Response: 
 * - 200 OK: Successfully Added
 * - 400 Bad Request: If input fields is/are invalid
 * - 500 Not Found: If cart_item cannot be created
 */
export async function addCartItem(req: Request) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity) {
    return Response.json(
      { message: "Invalid input: Payload field/s missing" },
      { status: 400 }
    );
  }

  const userIdNum = Number(userId);
  if (isNaN(userIdNum)) {
    return Response.json(
      { message: "Invalid input: userId is not a number" },
      { status: 400 }
    );
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO cart_item (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userIdNum, productId, quantity]
      );

      if (result.affectedRows === 0) {
        return Response.json({ message: "Insert failed" }, { status: 500 });
      }

      return Response.json(
        { message: "Cart item added successfully" },
        { status: 200 }
      );
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error("DB Error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return Response.json({ message: "Duplicate Entry Error" }, { status: 404 });
    } else {
      return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
  }
}


/**
 * delete a cart_item of a user
 * DELETE /api/cart_item/[id]
 *
 * Deletes a cart_item based on the dynamic `id` parameter in the URL path.
 * Example request: DELETE /api/cart_item/123
 * 
 * Route param:
 * - id (string): cart_item passed as part of the URL (e.g., /api/user/123)
 * 
 * Response:
 * - 200 OK: Successfully Deleted
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If user is not found
 */

export async function deleteCartItem(req: Request, { params }: { params: { userId: string } }) {
  const userId = params.userId;

  const userIdNum = Number(userId);
  if (!Number.isInteger(userIdNum)) {
    return Response.json(
      { message: "Invalid input: userId is invalid" },
      { status: 400 }
    );
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM cart_item WHERE user_id = ?",
        [userIdNum]
      );

      if (result.affectedRows > 0) {
        return Response.json({ message: "Item(s) successfully deleted" }, { status: 200 });
      } else {
        return Response.json({ message: "No items found for this user" }, { status: 404 });
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
 * GET /api/cart_item/[id]
 *
 * Retrieves user information based on the dynamic `id` parameter in the URL path.
 * Example request: GET /api/user/123
 * 
 * Route param:
 * - id (string): cart_item ID passed as part of the URL (e.g., /api/user/123)
 * 
 * Response:
 * - 200 OK: Returns user data
 * - 400 Bad Request: If ID is not a valid integer
 * - 404 Not Found: If user is not found
 */
export async function getCartItem(req: Request, { params }: { params: { userId: string } }) {
  // Basic validation
  const userId: string | null = params.userId;
  if (userId === null) {
    return Response.json(
      { message: "Missing required parameter: id" },
      { status: 400 }
    );
  }
  const userIdNum = Number(userId);
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
        "SELECT * FROM cart_item WHERE user_id = ?",
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
