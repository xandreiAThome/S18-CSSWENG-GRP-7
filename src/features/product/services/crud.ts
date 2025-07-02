import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

/**
 * Gets the data of a product
 *
 * @param {Number} id The ID of the `product`
 */
export async function getProduct(id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      // Check if product exists
      const [products] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM product WHERE id = ?",
        [id]
      );
      const product = products[0];
      if (!product) {
        return Response.json( { message: "Product not found" }, { status: 404 });
      }
      return Response.json({ product: product }, { status: 200 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
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
export async function addProduct(id: Number, name: string, sku: string, category_id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO product (id, name, sku, category_id) VALUES (?, ?, ?, ?)",
        [id, name, sku, category_id]
      );
      if (result.affectedRows === 0) {
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
      }
      return Response.json({message: "Product created successfully" }, { status: 201 });
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
export async function deleteProduct(id: Number) {
  try {
    const conn = await pool.getConnection();
    // Delete cart item from user
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM product WHERE id = ?",
        [id]
      );
      if (result.affectedRows > 0) {
        return Response.json({ message: "Item successfully deleted" }, { status: 200 });
      } else {
        return Response.json({ message: "Nothing to delete" }, { status: 404 });
      }
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
