import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler to remove a single cart_item from a user
 * 
 * @param {NextApiRequest} req Incoming request containing:
 * - `userId`: The ID of the `user`
 * - `cartItemId`: The ID of the `cart_item` to be deleted
 * @param {NextApiResponse} res Response object containing `userId` and the `cart_items` associated with it
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId, cartItemId } = req.body;

    // Basic validation
    if (!userId || !cartItemId) {
        return res.status(400).json({ message: 'Invalid input: Payload field/s missing' });
    }

    try {
        const conn = await pool.getConnection();

        // Delete cart item from user
        try {
            const [result] = await conn.query<ResultSetHeader>(
                'DELETE FROM cart_item WHERE id = ? AND user_id = ?',
                [cartItemId, userId]
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