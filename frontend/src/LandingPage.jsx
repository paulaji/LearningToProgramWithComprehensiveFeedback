import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const features = [
        { icon: '🎯', title: 'Interactive Learning', desc: 'Coursera-style structured courses with hands-on projects' },
        { icon: '⚡', title: 'Live Coding', desc: 'Replit-powered browser IDE with instant execution' },
        { icon: '🧠', title: 'AI Assistant', desc: 'Copilot-level code suggestions and error detection' },
        { icon: '🏆', title: 'Challenges', desc: 'LeetCode-style problem solving with detailed explanations' }
    ];

    const codeSnippet = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# AI suggests optimization
def fibonacci_optimized(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`;

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #581c87 35%, #1e1b4b 70%, #0f172a 100%)',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const mouseGlowStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        pointerEvents: 'none',
        opacity: 0.8
    };

    const navStyle = {
        position: 'relative',
        zIndex: 10,
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(20px)',
        background: 'rgba(15, 23, 42, 0.3)',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
    };

    const logoStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #a855f7, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '32px',
        alignItems: 'center'
    };

    const navLinkStyle = {
        color: 'rgba(255, 255, 255, 0.8)',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        position: 'relative'
    };

    const signInButtonStyle = {
        padding: '12px 24px',
        border: '2px solid #a855f7',
        borderRadius: '50px',
        background: 'transparent',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '16px'
    };

    const heroSectionStyle = {
        textAlign: 'center',
        marginBottom: '120px',
        transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        opacity: isLoaded ? 1 : 0,
        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        paddingTop: '80px'
    };

    const mainTitleStyle = {
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        fontWeight: '800',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #fbbf24 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1.1',
        letterSpacing: '-0.02em'
    };

    const subtitleStyle = {
        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        color: 'rgba(255, 255, 255, 0.7)',
        maxWidth: '800px',
        margin: '0 auto 48px auto',
        lineHeight: '1.6',
        fontWeight: '400'
    };

    const primaryButtonStyle = {
        display: 'inline-block',
        padding: '18px 36px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        borderRadius: '50px',
        fontSize: '18px',
        fontWeight: '700',
        textDecoration: 'none',
        color: 'white',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 16px 16px 0'
    };

    const secondaryButtonStyle = {
        display: 'inline-block',
        padding: '18px 36px',
        border: '2px solid #8b5cf6',
        borderRadius: '50px',
        fontSize: '18px',
        fontWeight: '700',
        textDecoration: 'none',
        color: 'white',
        background: 'transparent',
        transition: 'all 0.3s ease',
        margin: '0 16px 16px 0',
        cursor: 'pointer'
    };

    const featuresGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        marginBottom: '120px',
        padding: '0 24px'
    };

    const featureCardStyle = (index) => ({
        padding: '32px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
        opacity: isLoaded ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
    });

    const demoSectionStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '64px',
        alignItems: 'center',
        marginBottom: '120px',
        padding: '0 24px'
    };

    const codeEditorStyle = {
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(71, 85, 105, 0.5)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden'
    };

    const codeHeaderStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
    };

    const dotStyle = (color) => ({
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: color
    });

    const codeStyle = {
        fontSize: '14px',
        color: '#e2e8f0',
        fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap',
        overflow: 'auto'
    };

    const aiSuggestionStyle = {
        position: 'absolute',
        right: '-16px',
        top: '120px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        color: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
        fontSize: '14px',
        maxWidth: '200px',
        animation: 'pulse 2s infinite'
    };

    const ctaSectionStyle = {
        textAlign: 'center',
        padding: '120px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        borderRadius: '32px',
        margin: '0 24px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(139, 92, 246, 0.2)'
    };

    const ParticleComponent = ({ index }) => {
        const particleStyle = {
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: 'linear-gradient(45deg, #a855f7, #ec4899)',
            borderRadius: '50%',
            left: `${15 + index * 12}%`,
            top: `${25 + index * 8}%`,
            animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`,
            opacity: 0.6
        };

        return <div style={particleStyle} />;
    };

    return (
        <div style={containerStyle}>
            <div style={mouseGlowStyle} />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <ParticleComponent key={i} index={i} />
            ))}

            {/* Navigation */}
            <nav style={navStyle}>
                <div style={logoStyle}>Learning to Program with Comprehensive Feedback</div>
                <div style={navLinksStyle}>
                    <a href="#features" style={navLinkStyle}>Features</a>
                    <a href="#demo" style={navLinkStyle}>Demo</a>
                    <button
                        style={signInButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#8b5cf6';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Hero Section */}
                <div style={heroSectionStyle}>
                    <h1 style={mainTitleStyle}>
                        Master Programming<br />
                        <span style={{ fontSize: '0.8em' }}>Your Way</span>
                    </h1>

                    <p style={subtitleStyle}>
                        The ultimate AI-powered Python learning platform that combines the best of{' '}
                        <span style={{ color: '#a855f7', fontWeight: '600' }}>Coursera</span>,{' '}
                        <span style={{ color: '#22c55e', fontWeight: '600' }}>LeetCode</span>,{' '}
                        <span style={{ color: '#3b82f6', fontWeight: '600' }}>Replit</span>, and{' '}
                        <span style={{ color: '#f59e0b', fontWeight: '600' }}>Copilot</span>
                    </p>

                    {/* <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <a
                            href="/course"
                            style={primaryButtonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                                e.target.style.boxShadow = '0 20px 60px rgba(139, 92, 246, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.boxShadow = '0 10px 40px rgba(139, 92, 246, 0.3)';
                            }}
                        >
                            🚀 Start Learning
                        </a>

                        <button
                            style={secondaryButtonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.background = '#8b5cf6';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            🎥 Watch Demo
                        </button>
                    </div> */}
                </div>



                {/* Code Demo Section */}
                <div id="demo" style={demoSectionStyle}>
                    <div>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: '800',
                            marginBottom: '24px',
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Learn by Doing
                        </h2>
                        <p style={{
                            fontSize: '20px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '32px',
                            lineHeight: '1.6'
                        }}>
                            Write code in our browser-based IDE and get instant AI feedback.
                            Our intelligent system provides suggestions, catches errors, and helps you optimize your solutions.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { color: '#22c55e', text: 'Real-time syntax highlighting' },
                                { color: '#3b82f6', text: 'AI-powered code completion' },
                                { color: '#a855f7', text: 'Instant performance feedback' }
                            ].map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', background: item.color, borderRadius: '50%' }} />
                                    <span style={{ fontSize: '16px' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={codeEditorStyle}>
                            <div style={codeHeaderStyle}>
                                <div style={dotStyle('#ef4444')} />
                                <div style={dotStyle('#eab308')} />
                                <div style={dotStyle('#22c55e')} />
                                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginLeft: '16px' }}>
                                    fibonacci.py
                                </span>
                            </div>
                            <pre style={codeStyle}>
                                <code>{codeSnippet}</code>
                            </pre>
                        </div>

                        <div style={aiSuggestionStyle}>
                            <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>💡 AI Suggestion</div>
                            <div style={{ fontSize: '12px', opacity: 0.9 }}>Use dynamic programming for O(n) complexity</div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div id="features" style={featuresGridStyle}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={featureCardStyle(index)}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-8px) scale(1.02)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>{feature.title}</h3>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', lineHeight: '1.5' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div style={ctaSectionStyle}>
                    <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>
                        Ready to Transform Your Coding Journey?
                    </h2>
                    <p style={{
                        fontSize: '20px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '32px',
                        maxWidth: '600px',
                        margin: '0 auto 32px auto'
                    }}>
                        Learn by Doing, Do by Learning
                    </p>
                    <a
                        href="/course"
                        style={{
                            ...primaryButtonStyle,
                            fontSize: '20px',
                            padding: '20px 48px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px) scale(1.05)';
                            e.target.style.boxShadow = '0 20px 60px rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 10px 40px rgba(139, 92, 246, 0.3)';
                        }}
                    >
                        Start Your Journey Today
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(180deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    overflow-x: hidden;
                }
                
                @media (max-width: 768px) {
                    nav {
                        flex-direction: column;
                        gap: 16px;
                    }
                    
                    .nav-links {
                        gap: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;