import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
* API handler to remove a category
* 
* @param {NextApiRequest} req Incoming request containing:
* - `id`: The ID of the `category`
* @param {NextApiResponse} res Response object containing status message.
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { id } = req.body;
  
  // Basic validation
  const categoryIdNum = Number(id)
  if (!id || isNaN(categoryIdNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }
  
  try {
    const conn = await pool.getConnection();

    try {
      const [result] = await conn.query<ResultSetHeader>(
        'DELETE FROM category WHERE id = ?',
        [categoryIdNum]
      )
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Item successfully deleted' })
      } else {
        return res.status(404).json({ message: 'Nothing to delete' })
      }
    } finally {
      conn.release();
    }
    
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}