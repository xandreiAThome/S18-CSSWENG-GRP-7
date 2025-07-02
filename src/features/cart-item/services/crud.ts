// TO BE CHANGED LATER (NOT DONE)

import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export async function addCartItem(id: Number, productId: Number, quantity: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO cart_item (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [id, productId, quantity]
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
    return catchDBError(err);
    
  }
}

export async function deleteCartItem(id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM cart_item WHERE user_id = ?",
        [id]
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
 * API handler to fetch the cart_items of a user
 *
 * @param {NextApiRequest} req Incoming request containing:
 * - `userId`: The ID of the `user`
 * - `sortBy`: Field to sort by -- `"added_date"`, `"quantity"`, `"product_id"`
 * - `sortOrder`: Sort Direction -- `"ASC"`, `"DESC"`
 * @param {NextApiResponse} res Response object containing `userId` and the `cart_items` associated with it
 */
export async function getCartItem(id: Number, sortBy: string, sortOrder: string) {
  // Sort Validation
  const sortByDefault = "added_date";
  const sortOrderDefault = "ASC";
  const allowedSortByFields = ["added_date", "quantity", "product_id"];
  const allowedSortOrderFields = ["ASC", "DESC"];

  try {
    sortBy = sortBy.toLowerCase();
    sortBy = allowedSortByFields.includes(sortBy) ? sortBy : sortByDefault;
  } catch {
    sortBy = sortByDefault;
  }
  try {
    sortOrder = sortOrder.toUpperCase();
    sortOrder = allowedSortOrderFields.includes(sortOrder)
      ? sortOrder
      : sortOrderDefault;
  } catch {
    sortOrder = sortOrderDefault;
  }
  try {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<RowDataPacket[]>(
        "SELECT * FROM cart_item WHERE user_id = ?",
        [id]
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
