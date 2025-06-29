import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/lib/db'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Query failed', details: err })
    }
    res.status(200).json({ message : "success" })

  })
}
