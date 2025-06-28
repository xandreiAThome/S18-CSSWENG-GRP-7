import pool from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2'

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
 * API handler to get the information of a single `user`
 * 
 * @param {NextApiRequest} req Incoming request query containing:
 * - `userId`: The ID of the `user`
 * @param {NextApiResponse} res Response object containing the user's data in JSON
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = extractParamAsString(req.query.id); 

  // Basic validation
  const userIdNum = Number(userId)
  if (!userId || isNaN(userIdNum)) {
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

      const user = users[0];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ userdata: user });
      
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}