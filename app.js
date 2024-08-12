require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Kết nối với SQL Server
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database');
    }
});

// API để đăng nhập
app.post('/login', async (req, res) => {
    const { USER_NAME, PASSWORD } = req.body;

    try {
        // Truy vấn người dùng từ cơ sở dữ liệu
        const result = await sql.query`SELECT * FROM dbo.tbl_user WHERE USER_NAME = ${USER_NAME} AND Deleted = 0`;

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Kiểm tra mật khẩu nếu mật khẩu lưu ở dạng plaintext
            const isMatch = PASSWORD === user.PASSWORD;
            if (isMatch) {
                // Tạo token
                const token = jwt.sign({ id: user.ID, role: user.Roleid }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
