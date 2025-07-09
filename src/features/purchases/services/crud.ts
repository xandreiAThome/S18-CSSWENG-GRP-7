import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils";
import { RowDataPacket, ResultSetHeader } from "mysql2";

/**
 * Gets all the data in the purchases table
 */
export async function getAllPurchaseProducts() {
  try {
    const conn = await pool.getConnection();
    try {
      const [products] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM purchases"
      );
      if (!products || products.length === 0) {
        return { status: 404, body: { message: "No available products" } };
      }
      return { status: 200, body: { products } };
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return { status: 500, body: { message: "Internal Server Error" } };
  }
}

/**
 * Gets the data of a purchases
 *
 * @param {Number} id The ID of the `product`
 */
export async function getPurchaseProducts(id: number) {
  try {
    const conn = await pool.getConnection();
    try {
      // Check if product exists
      const [products] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM purchases WHERE id = ?",
        [id]
      );
      const product = products[0];
      if (!product) {
        return { status: 404, body: { message: "Product not found" } };
      }
      return { status: 200, body: { product } };
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return { status: 500, body: { message: "Internal Server Error" } };
  }
}

/**
 * Adds a product to the database
 *
 * @param {Number} id The id of the product
 * @param {string} name The name of the product
 * @param {string} sku The Stock Keeping Unit
 * @param {Number} category_id The category_id of the product's category
 */
export async function addPurchaseProducts(
  id: number,
  cartId: number,
  productId: number,
  quantity: number
) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO purchases (id, cartId, productId, quantity) VALUES (?, ?, ?, ?)",
        [id, cartId, productId, quantity]
      );
      if (result.affectedRows === 0) {
        return { status: 500, body: { message: "Internal Server Error" } };
      }
      return { status: 201, body: { message: "Product created successfully" } };
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error("DB Error:", err);
    return catchDBError(err);
  }
}

/**
 * API handler to delete a product
 *
 * @param {Number} id The ID of the `product` to be deleted
 */
export async function deletePurchaseProducts(id: number) {
  try {
    const conn = await pool.getConnection();
    // Delete cart item from user
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM purchases WHERE id = ?",
        [id]
      );
      if (result.affectedRows > 0) {
        return { status: 200, body: { message: "Item successfully deleted" } };
      } else {
        return { status: 404, body: { message: "Nothing to delete" } };
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return { status: 500, body: { message: "Internal Server Error" } };
  }
}
