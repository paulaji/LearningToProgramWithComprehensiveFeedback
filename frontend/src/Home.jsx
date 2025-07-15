import React, { useState, useEffect } from 'react';

const Home = () => {
    const [pyodide, setPyodide] = useState(null);
    const [code, setCode] = useState('print("Hello from Python!")');
    const [output, setOutput] = useState('');

    const [question, setQuestion] = useState('Error generating question');
    const [answer, setAnswer] = useState('Error generating question');

    useEffect(() => {
        const loadPyodideScript = async () => {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
            script.onload = async () => {
                const loadedPyodide = await window.loadPyodide();
                setPyodide(loadedPyodide);
            };
            document.body.appendChild(script);
        };

        loadPyodideScript();
    }, []);

    // Compile and run Python code
    const runPythonCode = async () => {
        if (!pyodide) {
            setOutput('Pyodide is still loading...');
            return;
        }

        try {
            // Redirect stdout to capture print() output
            await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = sys.stdout
        `);

            // Run user code
            await pyodide.runPythonAsync(code);

            // Get the captured output
            const output = await pyodide.runPythonAsync('sys.stdout.getvalue()');
            setOutput(output);
        } catch (err) {
            setOutput(`Error:\n${err}`);
        }
    };

    const getQuestion = async () => {
        const response = await fetch("http://localhost:5000/get_question");
        const qaObject = await response.json();
        const beQuestion = await qaObject["question"];
        const beAnswer = await qaObject["answer"];
        console.log("The be question is: ", beQuestion);
        setQuestion(beQuestion);
        console.log("The be answer is: ", beAnswer);
        setAnswer(beAnswer);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Learning to Program with Comprehensive Feedback</h2>
            <br />
            <button onClick={getQuestion}>Click here for a Question</button>
            <br />
            <br />
            <span>Question: </span>
            <span>{question}</span>
            <br />
            <br />
            <span>Answer: </span>
            <span>{answer}</span>
            <br />
            <br />
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                cols={60}
                style={{ fontFamily: 'monospace', fontSize: '1rem', width: '100%' }}
            />
            <br />
            <button onClick={runPythonCode} style={{ marginTop: 10 }}>
                Compile & Run
            </button>

            <h3>Output</h3>
            <span style={{ background: '#f0f0f0', padding: 10 }}>{output ? output : ''}</span>
        </div>
    );
};

export default Home;
