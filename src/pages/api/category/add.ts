import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler to add a category
 * 
 * @param {NextApiRequest} req Incoming request containing the following:
 * - `id`: The id of the category
 * - `name`: The name of the category
 * @param {NextApiResponse} res Response object containing status
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  const { id, name } = req.body;
  
  // Basic Validaton
  if (!id || !name) {
    return res.status(400).json({ message: 'Invalid input: Payload field/s missing' });
  }
  const categoryNum = Number(id);
  if (isNaN(categoryNum)) {
    return res.status(400).json({ message: 'Invalid input: id is invalid' });
  }
  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid input: name and sku must be strings' });
  } else if (name.length > 100) {
    return res.status(400).json({ message: 'Invalid input: name is too long' });
  }
  
  try {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.execute<ResultSetHeader>(
        'INSERT INTO category (id, name) VALUES (?, ?)',
        [categoryNum, name]
      );
      if (result.affectedRows === 0) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json({
        message: 'Category created successfully'
      });
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
