const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

async function login(req, res) {
    const { email, PASSWORD } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);

        if (user) {
            const isMatch = PASSWORD === user.PASSWORD;
            if (isMatch) {
                // Tạo token
                const token = jwt.sign({ id: user.ID, role: user.Roleid }, process.env.JWT_SECRET, { expiresIn: '1h' });

                if (user.Roleid === 2) {
                    res.json({ token, redirectUrl: '/news' });
                } else {
                    res.status(403).json({ message: 'Access denied' });
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
