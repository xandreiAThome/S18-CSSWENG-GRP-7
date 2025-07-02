import pool from '@/lib/db';
import { extractParamAsString } from '@/lib/utils';
import { ResultSetHeader } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
* API handler to remove a product
* 
* @param {NextApiRequest} req Incoming request containing:
* - `id`: The ID of the `product`
* @param {NextApiResponse} res Response object containing status message.
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  // Basic validation
  let id: string;
  try {
    id = extractParamAsString(req.query.id); 
  } catch {
    return res.status(400).json({ message: 'Missing required parameter: id' });
  }
  const productIdNum = Number(id)
  if (!Number.isInteger(productIdNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }
  
  try {
    const conn = await pool.getConnection();
    
    // Delete cart item from user
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        'DELETE FROM product WHERE id = ?',
        [productIdNum]
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