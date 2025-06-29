import mysql from 'mysql2'

const db = mysql.createConnection({
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
})

db.connect((err) => {
  if (err) {
    console.error(' DB connect error:', err)
  } else {
    console.log(' Connected to MySQL')
  }
})

export default db
