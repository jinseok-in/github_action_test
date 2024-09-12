const path = require('path');  // 경로 조작을 위한 모듈
const pool = require('../config/database'); // 데이터베이스 연결 모듈 가져오기
const { spawn } = require('child_process');

// POST 처리 함수
const postChatbotData = async (req, res) => {
  const { message } = req.body;

  // -- return query --
  // 경로 설정
  const returnQueryPath = path.join(__dirname, '../algorithm/script/return_query.py');

  // Python 실행
  const return_query = spawn('python', [returnQueryPath, message]);
  let return_query_data = '';
  let return_query_error = '';

  // Python 출력 수신
  return_query.stdout.on('data', (data) => {
    return_query_data += data.toString();
  });

  // Python 에러 출력 수신
  return_query.stderr.on('data', (error) => {
    return_query_error += error.toString();
  });

  // Python 스크립트가 종료된 후 데이터베이스 쿼리 수행
  return_query.on('close', async (code) => {
    try {
      console.log(`Python script finished with code ${code}`);
      
      if (return_query_error.trim() !== '') {
        console.error('Error from Python script:', return_query_error);
        throw new Error('Python script execution error');
      }

      // Python 스크립트 출력에서 SQL 쿼리만 추출
      const query = return_query_data.trim().split('\n').pop(); // 마지막 줄에 있는 SQL 쿼리만 사용
      if (query === '') {
        // Python 스크립트에서 아무 쿼리도 반환하지 않으면 오류 처리
        throw new Error('Invalid SQL query from Python script');
      }

      // 데이터베이스 쿼리 수행
      const result = await pool.query(query); // SQL 쿼리 수행

      // -- sentence creation -- 
      // 경로 설정
      const sentenceCreationPath = path.join(__dirname, '../algorithm/script/sentence_creation.py');
      console.log(sentenceCreationPath)
      // Python 실행 (결과를 JSON 문자열로 변환하여 전달)
      const sentence_creation = spawn('python', [sentenceCreationPath, JSON.stringify(result[0])]);
      let sentence_creation_data = '';
      let sentence_creation_error = '';
      
      // Python 출력 수신
      sentence_creation.stdout.on('data', (data) => {
        sentence_creation_data += data.toString();
      });

      // Python 에러 수신
      sentence_creation.stderr.on('data', (error) => {
        sentence_creation_error += error.toString();
      });

      // Python 스크립트가 종료된 후 응답 전송
      sentence_creation.on('close', () => {
        if (sentence_creation_error.trim() !== '') {
          console.error('Error from Python script:', sentence_creation_error);
          res.status(500).json({ error: 'Failed to process data' });
        } else {
          console.log(sentence_creation_data);
          console.log('위에 이게 출력된 값')
          const send_sentence = sentence_creation_data;
          res.json({ data: send_sentence });
        }
      });

    } catch (error) {
      console.error('Error processing chatbot data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // 에러 처리
  return_query.on('error', (error) => {
    console.error('Error executing Python script:', error);
    res.status(500).json({ error: 'Failed to execute Python script' });
  });
};

module.exports = {
  postChatbotData, // 새로 추가한 POST 처리 함수 내보내기
};
