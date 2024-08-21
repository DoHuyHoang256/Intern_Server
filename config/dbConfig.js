const { Pool } = require('pg');

// Cấu hình kết nối PostgreSQL
const config = {
    user: 'bodyguard_user',
    host: 'dpg-cr2j2c08fa8c73djui7g-a.singapore-postgres.render.com',
    database: 'bodyguard',
    password: 'j9BPzsKzzzI6DrqwMlGkiDyi2nrTklXJ',
    port: 5432, // Port mặc định của PostgreSQL
    ssl: {
        rejectUnauthorized: false // Bỏ qua xác thực SSL nếu cần
    }
};

// Tạo Pool kết nối
const pool = new Pool(config);

// Kiểm tra kết nối
pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('Database Connection Failed: ', err);
    });

module.exports = { pool };
