import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export async function upsertCartItem(id: Number, productId: Number, quantity: Number) {
  try {
    const conn = await pool.getConnection();
    const now = new Date();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        `INSERT INTO cart_item (user_id, product_id, quantity, added_date) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = VALUES(quantity), added_date = VALUES(added_date)`,
        [id, productId, quantity, now]
      );

      if (result.affectedRows === 0) {
        return Response.json({ message: "Insert failed" }, { status: 500 });
      } 

      const message = result.affectedRows === 1
        ? "Cart item inserted successfully"
        : "Cart item updated successfully";

      return Response.json(
        { message: message,
        },
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

export async function deleteCartItem(userId: Number, cartItemId: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM cart_item WHERE user_id = ? AND id = ?",
        [userId, cartItemId]
      );

      if (result.affectedRows > 0) {
        return Response.json({ message: "Item successfully deleted" }, { status: 200 });
      } else {
        return Response.json({ message: `No such cart-item found for this user` }, { status: 404 });
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
 * Gets the cart-item/s of a specific user.
 *
 * - `id`: The ID of the `user`
 * - `sortBy`: Field to sort by -- `"added_date"`, `"quantity"`, `"product_id"`
 * - `sortOrder`: Sort Direction -- `"ASC"`, `"DESC"`
 */
export async function getCartItem(id: Number, sortBy: string, sortOrder: string) {
  // Sort Validation
  const sortByDefault = "added_date";
  const sortOrderDefault = "ASC";
  const allowedSortByFields = ["added_date", "quantity", "product_id"];
  const allowedSortOrderFields = ["ASC", "DESC"];

  console.log(sortBy);
  console.log(sortOrder);

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
      console.log(`SELECT * FROM cart_item WHERE user_id = ? ORDER BY ${sortBy} ${sortOrder}`);
      const [cItems] = await conn.execute<RowDataPacket[]>(
        `SELECT * FROM cart_item WHERE user_id = ? ORDER BY ${sortBy} ${sortOrder}`,
        [id]
      );

      if (!cItems) {
        return Response.json({ message: "User Cart Item/s not found" }, { status: 400 });
      }

      return Response.json({ cItems }, { status: 200 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
