import pool from '@/lib/db';
import { extractParamAsString } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2'

/**
 * API handler to get the information of a single `category`
 * 
 * @param {NextApiRequest} req Incoming request query containing:
 * - `id`: The ID of the category`
 * @param {NextApiResponse} res Response object containing the category data in JSON
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
  const categoryIdNum = Number(id)
  if (!Number.isInteger(categoryIdNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }

  try {
    const conn = await pool.getConnection();
    try {
      const [categories] = await conn.query<RowDataPacket[]>(
        'SELECT * FROM category WHERE id = ?',
        [categoryIdNum]
      );

      const category = categories[0];
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({ category: category });
      
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}