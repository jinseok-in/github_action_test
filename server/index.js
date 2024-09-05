const express = require('express');
const cors = require('cors');
const pythonRoutes = require('./routes/pythonRoutes');  // Python 라우터 설정

const app = express();
app.use(cors());
app.use(express.json());  // JSON 파싱 미들웨어

// 라우트 설정
app.use('/api', pythonRoutes);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});