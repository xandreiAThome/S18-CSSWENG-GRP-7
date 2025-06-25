import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    port: process.env.PORT_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;