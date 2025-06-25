import pool from '@/lib/db';

export default async function handler(req, res) {
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
            const [result] = await conn.query(
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