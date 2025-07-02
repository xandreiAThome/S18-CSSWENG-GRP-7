import pool from '@/lib/db';
import { extractParamAsString } from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from 'mysql2'

/**
 * API handler to get the information of a single `product`
 * 
 * @param {NextApiRequest} req Incoming request query containing:
 * - `id`: The ID of the `product`
 * @param {NextApiResponse} res Response object containing the user's data in JSON
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Basic Validation
  let id: string;
  try {
    id = extractParamAsString(req.query.id); 
  } catch {
    return res.status(400).json({ message: 'Missing required parameter: id' });
  }
  const idNum = Number(id)
  if (isNaN(idNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }

  try {
    const conn = await pool.getConnection();
    try {
      // Check if product exists
      const [products] = await conn.query<RowDataPacket[]>(
        'SELECT * FROM product WHERE id = ?',
        [idNum]
      );

      const product = products[0];
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ product: product });
      
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}