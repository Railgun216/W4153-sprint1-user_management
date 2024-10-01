// db.js
const mysql = require('mysql2');
require('dotenv').config();  // 加载 .env 文件中的环境变量

// 从 .env 文件中读取 AWS RDS 配置
const db = mysql.createConnection({
    host: process.env.DB_HOST,       // AWS RDS 的主机名
    user: process.env.DB_USER,       // AWS RDS 数据库用户名
    password: process.env.DB_PASSWORD, // AWS RDS 数据库密码
    database: process.env.DB_NAME,     // 数据库名称
    port: 3306                        // 默认 MySQL 端口
});

// 建立数据库连接
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database on AWS RDS.');
});

module.exports = db;
