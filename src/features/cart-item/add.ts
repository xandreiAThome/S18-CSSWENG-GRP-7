import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * API handler to add a cart_item to a user
 *
 * @param {NextApiRequest} req Incoming request containing:
 * - `userId`: The ID of the `user`
 * - `productId`: The ID of the `product` to be added
 * - `quantity`: The number of product items to be added
 * @param {NextApiResponse} res Response object containing status
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, productId, quantity } = req.body;

  // Basic validation
  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Invalid input: Payload field/s missing" });
  } else if (quantity < 1) {
    return res
      .status(400)
      .json({ message: "Invalid input: Quantity cannot be less than 1" });
  }

  try {
    const conn = await pool.getConnection();
    try {
      // Check if this product exists in user's cart
      const [existing] = await conn.query<RowDataPacket[]>(
        `SELECT id, quantity FROM cart_item WHERE user_id = ? AND product_id = ?`,
        [userId, productId]
      );

      // Add quantities if existing, else insert item
      if (existing.length > 0) {
        const currentQty = existing[0].quantity;
        await conn.query(
          `UPDATE cart_item SET quantity = ?, added_date = NOW() WHERE id = ?`,
          [currentQty + quantity, existing[0].id]
        );
      } else {
        await conn.query(
          `INSERT INTO cart_item (user_id, product_id, quantity, added_date) VALUES (?, ?, ?, NOW())`,
          [userId, productId, quantity]
        );
      }

      res.status(200).json({ message: "Cart updated successfully" });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
