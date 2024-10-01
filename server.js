// server.js
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const express = require('express');
require('dotenv').config();  // 加载 .env 文件中的环境变量

const db = require('./db');  // 引入数据库连接

// 创建 Express 应用
const app = express();

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});
// 中间件设置
app.use(express.json());  // 解析 JSON 格式的请求体
app.use('/auth', authRoutes); // 路由前缀
// 测试数据库连接的路由
app.get('/', (req, res) => {
    res.send('This is the forum app by No Bug No Life team');
});

// 测试数据库的路由
app.get('/dbtest', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed.');
        }
        res.send(`Database test successful! Result: ${results[0].solution}`);
    });
});

// 启动服务器
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
