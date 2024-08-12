require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const app = express();

app.use(express.json());

// Thiết lập kết nối đến database
const dbConfig = {
    user: 'SQLAdmin',
    password: '12345678@a',
    server: 'mockprojecsqlserver.database.windows.net',
    port: 1433, // Sử dụng port mặc định của SQL Server
    database: 'newbodyguardDB',
    options: {
        encrypt: true // Bắt buộc đối với Azure SQL
    }
};

// Route ví dụ: Lấy tất cả các bản ghi từ bảng nào đó
app.get('/roles', async (req, res) => {
    try {
        // Kết nối đến SQL Server
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM tbl_role');

        res.json(result.recordset);

        // Đóng kết nối sau khi truy vấn xong
        pool.close();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});