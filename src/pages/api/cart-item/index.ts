import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Extracts the parameter taken from a ParsedUrlQuery as a single string
 * @param queryParam The query parameter
 * @returns The parameter if it is a string, the first element if it is an array of strings
 * @throws If the parameter is undefined
 */
function extractParamAsString(queryParam: string | string[] | undefined): string {
  if (Array.isArray(queryParam)) {
    return queryParam[0];
  }
  if (queryParam === undefined) {
    throw new Error('Missing query parameter');
  }
  return queryParam;
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
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  // Basic validation
  const sortByDefault = 'added_date';
  const sortOrderDefault = 'ASC';
  const allowedSortByFields = ['added_date', 'quantity', 'product_id'];
  const allowedSortOrderFields = ['ASC', 'DESC'];
  let userId, sortBy, sortOrder: string;
  
  try {
    userId = extractParamAsString(req.query.userId);
  } catch {
    return res.status(400).json({ message: 'Missing required parameter: userId' });
  }
  try {
    sortBy = extractParamAsString(req.query.sortBy).toLowerCase();
    sortBy = allowedSortByFields.includes(sortBy) ? sortBy : sortByDefault
  } catch {
    sortBy = sortByDefault;
  }
  try {
    sortOrder = extractParamAsString(req.query.sortOrder).toUpperCase();
    sortOrder = allowedSortOrderFields.includes(sortOrder) ? sortOrder : sortOrderDefault
  } catch {
    sortOrder = sortOrderDefault;
  }
  const userIdNum = Number(userId)
  if (!Number.isInteger(userIdNum)) {
    return res.status(400).json({ message: 'Invalid input: userId is invalid' });
  }
  
  try {
    const conn = await pool.getConnection();
    try {
      // Check if user exists
      const [users] = await conn.query<RowDataPacket[]>(
        'SELECT id FROM users WHERE id = ?',
        [userIdNum]
      );
      
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const [rows] = await conn.query(
        `SELECT * FROM cart_item WHERE user_id = ? ORDER BY ${sortBy} ${sortOrder}`,
        [userIdNum]
      );
      
      res.status(200).json({ userId: userIdNum, cartItems: rows });
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
