const sql = require('mssql');
const { poolPromise } = require('../config/dbConfig');

// Hàm lấy người dùng từ cơ sở dữ liệu theo email
const getUserByEmail = async (email) => {
    try {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database connection is not established');
        const result = await pool.request()
            .input('Email', sql.VarChar, email)
            .query('SELECT * FROM dbo.tbl_user WHERE Email = @Email AND Deleted = 0');
        return result.recordset[0];
    } catch (err) {
        console.error('Error querying the database: ', err);
        throw err;
    }
};

module.exports = {
    getUserByEmail
};
