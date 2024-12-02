const mysql = require('mysql2')
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10,
    connectTimeout: 10000,
    idleTimeout: 10000,
})

const connectWithRetry = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(`Error connecting to MySQL, retrying in 5 seconds:, ${err.message}`);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.info('connected to MySQL');
            connection.release();
        }
    });
};

module.exports = pool.promise();

connectWithRetry();