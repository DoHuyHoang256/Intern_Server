const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function login(req, res) {
    const { login, PASSWORD } = req.body; // Sử dụng 'login' thay cho 'email' hoặc 'USER_NAME'

    try {
        const user = await userModel.getUserByEmailOrUsername(login);

        if (user) {
            // So sánh mật khẩu người dùng nhập vào với mật khẩu lưu trong cơ sở dữ liệu
            const isMatch = PASSWORD === user.password;

            if (isMatch) {
                const token = jwt.sign({ id: user.id, role: user.roleid }, process.env.JWT_SECRET, { expiresIn: '1h' });

                if (user.roleid === 2) {
                    res.json({ token, redirectUrl: '/news' });
                }
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error in login controller:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login
};
