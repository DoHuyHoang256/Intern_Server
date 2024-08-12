const { poolPromise } = require('../config/dbConfig');

const getRoles = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM tbl_role');
        return result.recordset;
    } catch (err) {
        console.error('SQL error', err);
    }
};

module.exports = {
    getRoles
};
