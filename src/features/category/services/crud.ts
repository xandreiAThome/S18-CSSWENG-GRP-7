import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

/**
 * Adds a new category
 *
 * @param id The id of the category
 * @param name The name of the category
 * @return Response object containing status
 */
export async function addCategory(id: Number, name: string) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO category (id, name) VALUES (?, ?)",
        [id, name]
      );
      if (result.affectedRows === 0) {
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
      }
      return Response.json({message: "Category created successfully"}, {status: 201});
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error("DB Error:", err);
    return catchDBError(err);
  }
}

/**
 * Gets the data of a category
 * @param id the id of the category
 * @returns the data of the category, an error if occurs
 */
export async function getCategory(id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [categories] = await conn.query<RowDataPacket[]>(
        "SELECT * FROM category WHERE id = ?",
        [id]
      );

      const category = categories[0];
      if (!category) {
        return Response.json({ message: "Category not found" }, { status: 404 });
      }

      return Response.json({ category: category }, { status: 200 });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Deletes a category
 * @param id the id of the category
 * @returns Response object with status
 */
export async function deleteCategory(id: Number) {
  try {
    const conn = await pool.getConnection();

    try {
      const [result] = await conn.query<ResultSetHeader>(
        "DELETE FROM category WHERE id = ?",
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
  } catch (err: any) {
    console.error("DB Error:", err);
    return catchDBError(err);
  }
}
