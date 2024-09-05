import React, { useState } from 'react';

const App = () => {
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');

  const runPythonScript = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: inputValue })
      }); // get Express server end-point
      const data = await response.json();
      console.log('Received data:', data);
      setOutput(data.output); // Pyhont 실행 결과를 상태에 저장
    } catch (error) {
      console.error('Error running Python script : ', error);
    }
  };
  return (
    <div>
      <h1>Run python script</h1>
      <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter input for Python script"
      />
      <button onClick={runPythonScript}>Run Script</button>
      <div>
        <h2>Output : </h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default App;
