const sql = require('mssql');

const config = {
    user: 'SQLAdmin',
    password: '12345678@a',
    server: 'mockprojecsqlserver.database.windows.net',
    port: 1433,
    database: 'newbodyguardDB',
    options: {
        encrypt: true // Bắt buộc đối với Azure SQL
    }
};

const poolPromise = sql.connect(config).then(pool => {
    console.log('Connected to SQL Server');
    return pool;
}).catch(err => {
    console.error('Database Connection Failed: ', err);
    throw err;
});

module.exports = { poolPromise };
