const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // 确保路径正确

const router = express.Router();

// 注册新用户
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Signup request received:", req.body);
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    // 检查用户是否存在
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // 加密密码并存入数据库
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// 用户登录
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    // 查找用户
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 生成 JWT Token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    });
});

// 获取用户信息（需要验证）
router.get('/profile', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // 验证 token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid Token' });

        // 查找用户信息
        db.query('SELECT id, username, email FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.length === 0) return res.status(404).json({ message: 'User not found' });

            res.json(result[0]);
        });
    });
});

module.exports = router;

