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
  
  const userId: string = extractParamAsString(req.query.userId);
  const sortBy: string = extractParamAsString(req.query.sortBy);
  const sortOrder: string = extractParamAsString(req.query.sortOrder);
  
  // Basic validation
  const userIdNum = Number(userId)
  if (!userId || isNaN(userIdNum)) {
    return res.status(400).json({ message: 'Invalid input: userId is invalid' });
  }
  
  // Basic validation for optional request query, defaults to added_date, ASC
  const allowedSortByFields = ['added_date', 'quantity', 'product_id'];
  const allowedSortOrderFields = ['ASC', 'DESC'];
  const finalSortBy = allowedSortByFields.includes((sortBy || 'added_date').toUpperCase()) ? sortBy : 'added_date';
  const order = allowedSortOrderFields.includes((sortOrder || 'ASC').toUpperCase()) ? (sortOrder || 'ASC').toUpperCase() : 'ASC';
  
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
        `SELECT * FROM cart_item WHERE user_id = ? ORDER BY ${finalSortBy} ${order}`,
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
