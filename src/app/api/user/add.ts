import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler to add a user
 * 
 * @param {NextApiRequest} req Incoming request containing:
 * - `id`: The id of the user
 * - `name`: The name of the user
 * - `address`: The address of the user
 * @param {NextApiResponse} res Response object containing status
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { id, name, address } = req.body;
  
  // Basic validation
  if (!id || !name || !address) {
    return res.status(400).json({ message: 'Invalid input: Payload field/s missing' });
  }
  const userIdNum = Number(id)
  if (!id || isNaN(userIdNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }
  
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        'INSERT INTO user (id, name, address) VALUES (?, ?, ?)',
        [userIdNum, name, address]
      );
      if (result.affectedRows === 0) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'User created successfully' });
    } finally {
      conn.release();
    }
  } catch (err: any) {
    console.error('DB Error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      console.error('DB Error:', err.code, err.sqlMessage, err.stack);
      return res.status(409).json({message: 'Duplicate Entry Error'});
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
