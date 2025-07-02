import pool from '@/lib/db';
import { extractParamAsString } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2'

/**
 * API handler to get the information of a single `user`
 * 
 * @param {NextApiRequest} req Incoming request query containing:
 * - `id`: The ID of the `user`
 * @param {NextApiResponse} res Response object containing the user's data in JSON
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  // Basic validation
  let id: string;
  try {
    id = extractParamAsString(req.query.id); 
  } catch {
    return res.status(400).json({ message: 'Missing required parameter: id' });
  }
  const userIdNum = Number(id)
  if (!Number.isInteger(userIdNum)) {
    return res.status(400).json({ message: 'Invalid input: userId is invalid' });
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE id = ?',
        [userIdNum]
      );

      const user = users[0];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user: user });
      
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}