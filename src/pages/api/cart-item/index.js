import pool from '@/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId, sortBy, sortOrder } = req.query;

    // Basic validation
    const userIdNum = Number(userId)
    if (!userId || isNaN(userIdNum)) {
        return res.status(400).json({ message: 'Invalid input: userId is invalid' });
    }

    // Basic validation for optional request query, defaults to added_date, ASC
    const allowedSortByFields = ['added_date', 'quantity', 'product_id'];
    const allowedSortOrderFields = ['ASC', 'DESC'];
    sortBy = allowedSortByFields.includes(sortBy) ? sortBy : 'added_date';
    const order = allowedSortOrderFields.includes((sortOrder || 'ASC').toUpperCase()) ? (sortOrder || 'ASC').toUpperCase() : 'ASC';

    try {
        const conn = await pool.getConnection();
        try {
            // Check if user exists
            const [users] = await conn.query(
                'SELECT id FROM users WHERE id = ?',
                [userIdNum]
            );

            if (users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const [rows] = await conn.query(
                `SELECT * FROM cart_item WHERE user_id = ? ORDER BY ${sortBy} ${order}`,
                [userIdNum]
            );

            res.status(200).json({ userId: userIdNum, cartItems: rows });
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error('DB Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
