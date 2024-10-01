const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
require('dotenv').config();

const PORT = process.env.PORT || 3306;

// 中间件
app.use(express.json());

// 使用路由
app.use('/api/auth', authRoutes);

// 服务器启动
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

