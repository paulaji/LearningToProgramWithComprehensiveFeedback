import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProblemPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('code');

    // Mock topic from URL params
    const [searchParams] = useSearchParams();
    const topic = searchParams.get("topic");
    const topicDifficulty = searchParams.get("topicDifficulty");
    const topicDescription = searchParams.get("topicDescriptionForBackend");

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [code, setCode] = useState(`# Write your Python code here for topic: ${topic}\n`);
    const [output, setOutput] = useState('');
    const [pyodide, setPyodide] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const [aiFeedback, setAiFeedback] = useState('');
    const [tips, setTips] = useState([]);
    const [codeSuggestions, setCodeSuggestions] = useState([]);

    const [blurValue, setBlur] = useState("8px");

    useEffect(() => {
        const loadPyodideInstance = async () => {
            const pyodideScript = document.createElement('script');
            pyodideScript.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
            pyodideScript.onload = async () => {
                const pyodideInstance = await window.loadPyodide();
                setPyodide(pyodideInstance);
            };
            document.body.appendChild(pyodideScript);
        };

        loadPyodideInstance();
    }, []);

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const runCode = async () => {
        if (!pyodide) {
            setOutput('Pyodide not loaded yet. Please wait...');
            return;
        }

        setIsRunning(true);
        setOutput('Running code...');

        try {
            // Redirect stdout using Python's `io.StringIO`
            await pyodide.runPythonAsync(`
import sys
from io import StringIO

sys.stdout = sys.stderr = output_buffer = StringIO()
        `);

            // Run user code
            await pyodide.runPythonAsync(code);

            // Get captured output
            const result = await pyodide.runPythonAsync('output_buffer.getvalue()');
            setOutput(result || 'Code executed (no output).');
        } catch (err) {
            setOutput(`❌ Error:\n${err}`);
        } finally {
            setIsRunning(false);
        }
    };



    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #1e1b4b 70%, #0f172a 100%)',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        overflow: 'hidden'
    };

    const mouseGlowStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
        pointerEvents: 'none',
        opacity: 0.8
    };

    const headerStyle = {
        padding: '32px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(15, 23, 42, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 10
    };

    const topicBadgeStyle = {
        display: 'inline-block',
        padding: '8px 16px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '16px',
        textTransform: 'capitalize'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #fbbf24 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '8px'
    };

    const contentStyle = {
        padding: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '32px',
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 0.6s ease'
    };

    const mainPanelStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        transition: 'all 0.3s ease'
    };

    const questionCardStyle = {
        ...cardStyle,
        marginBottom: '24px'
    };

    const codeEditorStyle = {
        ...cardStyle,
        padding: '0',
        overflow: 'hidden',
        minHeight: '400px'
    };

    const editorHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'rgba(15, 23, 42, 0.5)'
    };

    const tabsStyle = {
        display: 'flex',
        gap: '16px'
    };

    const tabStyle = (active) => ({
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        background: active ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' : 'transparent',
        color: active ? 'white' : 'rgba(255, 255, 255, 0.6)',
        transition: 'all 0.3s ease'
    });

    const runButtonStyle = {
        padding: '12px 24px',
        background: isRunning ? 'rgba(139, 92, 246, 0.3)' : 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: isRunning ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const textareaStyle = {
        width: '100%',
        minHeight: '300px',
        background: 'rgba(15, 23, 42, 0.8)',
        border: 'none',
        color: '#e2e8f0',
        fontSize: '14px',
        fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
        padding: '24px',
        resize: 'none',
        outline: 'none',
        lineHeight: '1.6'
    };

    const outputStyle = {
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '24px',
        borderRadius: '8px',
        fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
        minHeight: '120px',
        color: '#e2e8f0',
        border: '1px solid rgba(139, 92, 246, 0.2)'
    };

    const sidebarStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: 'fit-content',
        position: 'sticky',
        top: '120px'
    };

    const aiFeedbackStyle = {
        ...cardStyle,
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
    };

    const sectionTitleStyle = {
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const tipStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        marginBottom: '8px',
        border: '1px solid rgba(139, 92, 246, 0.2)'
    };

    const codeSuggestionStyle = {
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
        fontSize: '12px',
        color: '#e2e8f0',
        marginBottom: '12px',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        whiteSpace: 'pre-wrap'
    };

    const ParticleComponent = ({ index }) => {
        const particleStyle = {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            borderRadius: '50%',
            left: `${10 + index * 15}%`,
            top: `${20 + index * 12}%`,
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
            opacity: 0.4
        };

        return <div style={particleStyle} />;
    };

    return (
        <div style={containerStyle}>
            <div style={mouseGlowStyle} />

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <ParticleComponent key={i} index={i} />
            ))}

            <div style={headerStyle}>
                <div style={topicBadgeStyle}>
                    🎯 {topic} - {topicDifficulty}
                </div>
                <h1 style={titleStyle}>Two Sum Problem</h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
                    Master array manipulation with this classic algorithm challenge
                </p>
            </div>

            <div style={contentStyle}>
                <div style={mainPanelStyle}>
                    <div style={questionCardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <button
                                style={runButtonStyle}
                                onClick={async () => {
                                    setBlur("8px");
                                    const res = await fetch(`http://localhost:5000/getproblemstatement?topic=${topic}&difficulty=${topicDifficulty}&description=${topicDescription}`);
                                    const data = await res.json();
                                    setQuestion(data.question ?? '');
                                    setAnswer(data.answer ?? '');
                                }}
                            >
                                <span>📋</span> View Problem Statement
                            </button>
                        </h3>
                        <div style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line'
                        }}>
                            {question}
                        </div>
                    </div>

                    <div style={codeEditorStyle}>
                        <div style={editorHeaderStyle}>
                            <div style={tabsStyle}>
                                <div
                                    style={tabStyle(activeTab === 'code')}
                                    onClick={() => setActiveTab('code')}
                                >
                                    💻 Code Editor
                                </div>
                                <div
                                    style={tabStyle(activeTab === 'output')}
                                    onClick={() => setActiveTab('output')}
                                >
                                    📊 Output
                                </div>
                            </div>
                            <button
                                style={runButtonStyle}
                                onClick={runCode}
                                disabled={isRunning}
                            >
                                {isRunning ? '⏳' : '▶️'}
                                {isRunning ? 'Running...' : 'Run Code'}
                            </button>
                        </div>

                        {activeTab === 'code' ? (
                            <textarea
                                style={textareaStyle}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Write your Python code here..."
                            />
                        ) : (
                            <div style={{ padding: '24px' }}>
                                <div style={outputStyle}>
                                    {output || 'No output yet. Run your code to see results.'}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={sidebarStyle}>
                    <div style={aiFeedbackStyle}>
                        <h3 style={sectionTitleStyle}>
                            <span>🤖</span> AI Feedback
                        </h3>
                        <div style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line'
                        }}>
                            {aiFeedback}
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <span>💡</span> Tips & Hints
                        </h3>
                        {tips.map((tip, idx) => (
                            <div key={idx} style={tipStyle}>
                                <span style={{ color: '#22c55e', fontSize: '12px' }}>✓</span>
                                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                    {tip}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <span>🔥</span> Optimized Solution
                        </h3>
                        {codeSuggestions.map((suggestion, idx) => (
                            <div key={idx} style={codeSuggestionStyle}>
                                {suggestion}
                            </div>
                        ))}
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <span>🟢</span> Answer
                        </h3>
                        <div
                            style={{
                                filter: `blur(${blurValue})`,
                            }}

                        >
                            {answer}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    overflow-x: hidden;
                }
                
                @media (max-width: 1024px) {
                    .content {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    
                    .sidebar {
                        position: static;
                    }
                }
                
                @media (max-width: 768px) {
                    .header {
                        padding: 20px;
                    }
                    
                    .content {
                        padding: 20px;
                    }
                    
                    .title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div >
    );
};

export default ProblemPage;