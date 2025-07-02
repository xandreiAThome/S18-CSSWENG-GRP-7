import pool from "@/lib/db";
import { catchDBError } from "@/lib/utils"
import { ResultSetHeader, RowDataPacket } from "mysql2";

/**
 * Adds a user to the database
 * @param id the id of the user
 * @param name the name of the user
 * @param address the address of the user
 * @returns HTTP Response containing the status
 */
export async function addUser(id: Number, name: string, address: string) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "INSERT INTO user (id, name, address) VALUES (?, ?, ?)",
        [id, name, address]
      );
      if (result.affectedRows === 0) {
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
      }
      return Response.json({message: "User created successfully"}, {status: 201});
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error("DB Error:", err);
    return catchDBError(err);
  }
}

/**
 * Deletes a specific user
 * @param id the user's id
 * @returns HTTP Response containing the status
 */
export async function deleteUser(id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        "DELETE FROM user WHERE id = ?",
        [id]
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
    return catchDBError(err);
  }
}


/**
 * Gets a specific user's data
 * @param id the user's id
 * @returns HTTP Response containing the user's data or an error
 */
export async function getUser(id: Number) {
  try {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<RowDataPacket[]>(
        "SELECT * FROM user WHERE id = ?",
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
    return catchDBError(err);
  }
}
