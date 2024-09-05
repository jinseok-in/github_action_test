const { spawn } = require('child_process');
const path = require('path');

exports.runPythonScript = (req, res) => {
  const { input } = req.body;

  // Python 스크립트의 절대 경로 설정
  const pythonScriptPath = path.join(__dirname, '../..', 'script', 'my_script.py');  // 파일 위치에 맞게 경로 설정

  // Python 프로세스 실행, 입력값을 인수로 전달
  const pythonProcess = spawn('python', [pythonScriptPath, input]);

  let scriptOutput = '';
  let scriptError = '';

  // Python 프로세스에서 데이터를 수신하는 콜백
  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString(); // 출력 결과를 축적
  });

  // 에러가 발생했을 때
  pythonProcess.stderr.on('data', (data) => {
    scriptError += data.toString(); // 오류 메시지를 축적
  });

  // 프로세스가 종료되었을 때
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      // 정상 종료 시 결과 전송
      res.status(200).json({ output: scriptOutput });
    } else {
      // 오류 발생 시 오류 메시지 전송
      console.error(`Error executing Python script: ${scriptError}`);
      res.status(500).json({ error: `Python error: ${scriptError}` });
    }
  });
};