const { Pool } = require('pg');
const { pool } = require('../config/dbConfig');

// Hàm lấy thông tin người dùng theo email hoặc tên người dùng
const getUserByEmailOrUsername = async (login) => {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(`
                SELECT * FROM tbl_user 
                WHERE (email = $1 OR user_name = $1) 
                AND deleted = false
            `, [login]);
            return result.rows[0];
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error querying the database: ', err);
        throw err;
    }
};

module.exports = {
    getUserByEmailOrUsername
};
