import React, { useState, useEffect } from 'react';

const topics = [
    {
        id: 'variables',
        title: 'Variables & Data Types',
        description: 'Learn about Python variables and basic data types like strings, integers, and floats.',
        icon: '🔢',
        difficulty: 'Beginner',
        duration: '45 min',
        color: '#3b82f6'
    },
    {
        id: 'control',
        title: 'Control Flow',
        description: 'Understand if-else statements, loops, and logical conditions to control program flow.',
        icon: '🔄',
        difficulty: 'Beginner',
        duration: '60 min',
        color: '#10b981'
    },
    {
        id: 'functions',
        title: 'Functions',
        description: 'Define and call functions, pass arguments, return values, and understand scope.',
        icon: '⚙️',
        difficulty: 'Intermediate',
        duration: '75 min',
        color: '#8b5cf6'
    },
    {
        id: 'lists',
        title: 'Lists & Dictionaries',
        description: 'Work with Python collections like lists and dictionaries for data organization.',
        icon: '📋',
        difficulty: 'Intermediate',
        duration: '90 min',
        color: '#f59e0b'
    },
    {
        id: 'file',
        title: 'File Handling',
        description: 'Read and write to files using Python, handle exceptions and file operations.',
        icon: '📁',
        difficulty: 'Intermediate',
        duration: '50 min',
        color: '#ef4444'
    },
    {
        id: 'oop',
        title: 'Object-Oriented Programming',
        description: 'Master classes, objects, inheritance, polymorphism, and encapsulation.',
        icon: '🏗️',
        difficulty: 'Advanced',
        duration: '120 min',
        color: '#ec4899'
    }
];

const CoursePage = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [hoveredTopic, setHoveredTopic] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredTopics = selectedFilter === 'All'
        ? topics
        : topics.filter(topic => topic.difficulty === selectedFilter);

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '0',
        margin: '0'
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '0 0 32px 32px',
        padding: '60px 40px',
        textAlign: 'center',
        marginBottom: '40px'
    };

    const titleStyle = {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '800',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1.2'
    };

    const subtitleStyle = {
        fontSize: '1.25rem',
        color: 'rgba(255, 255, 255, 0.7)',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6'
    };

    const contentStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 80px 40px'
    };

    const filterContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '48px',
        flexWrap: 'wrap'
    };

    const filterButtonStyle = (isActive) => ({
        padding: '12px 24px',
        borderRadius: '25px',
        border: isActive ? '2px solid #8b5cf6' : '2px solid rgba(139, 92, 246, 0.3)',
        background: isActive
            ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
            : 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    });

    const topicsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '24px',
        marginTop: '32px'
    };

    const topicCardStyle = (topic, index) => ({
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        textDecoration: 'none',
        color: 'white',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        border: `1px solid ${topic.color}40`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
        opacity: isLoaded ? 1 : 0,
        transitionDelay: `${index * 100}ms`
    });

    const topicIconStyle = {
        fontSize: '48px',
        marginBottom: '16px',
        display: 'block'
    };

    const topicTitleStyle = {
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '12px',
        color: 'white'
    };

    const topicDescriptionStyle = {
        fontSize: '16px',
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: '1.6',
        marginBottom: '24px'
    };

    const topicMetaStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
    };

    const difficultyBadgeStyle = (difficulty) => {
        const colors = {
            'Beginner': '#22c55e',
            'Intermediate': '#f59e0b',
            'Advanced': '#ef4444'
        };

        return {
            padding: '6px 12px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: '600',
            background: `${colors[difficulty]}20`,
            color: colors[difficulty],
            border: `1px solid ${colors[difficulty]}40`
        };
    };

    const durationStyle = {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    };

    const progressBarStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        height: '3px',
        background: 'linear-gradient(90deg, transparent 0%, #8b5cf6 100%)',
        borderRadius: '0 0 20px 20px',
        transform: hoveredTopic ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.6s ease'
    };

    const statsContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
    };

    const statCardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        border: '1px solid rgba(139, 92, 246, 0.2)'
    };

    const statNumberStyle = {
        fontSize: '36px',
        fontWeight: '800',
        color: '#8b5cf6',
        display: 'block',
        marginBottom: '8px'
    };

    const statLabelStyle = {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500'
    };

    return (
        <div style={containerStyle}>
            {/* Header Section */}
            <div style={headerStyle}>
                <h1 style={titleStyle}>Choose Your Learning Path</h1>
                <p style={subtitleStyle}>
                    Master Python programming with our structured, interactive courses designed for all skill levels
                </p>
            </div>

            <div style={contentStyle}>
                {/* Stats Section */}
                <div style={statsContainerStyle}>
                    <div style={statCardStyle}>
                        <span style={statNumberStyle}>6</span>
                        <span style={statLabelStyle}>Complete Courses</span>
                    </div>
                    <div style={statCardStyle}>
                        <span style={statNumberStyle}>50+</span>
                        <span style={statLabelStyle}>Coding Challenges</span>
                    </div>
                    <div style={statCardStyle}>
                        <span style={statNumberStyle}>24/7</span>
                        <span style={statLabelStyle}>AI Assistant</span>
                    </div>
                    <div style={statCardStyle}>
                        <span style={statNumberStyle}>100%</span>
                        <span style={statLabelStyle}>Hands-on Learning</span>
                    </div>
                </div>

                {/* Filter Section */}
                <div style={filterContainerStyle}>
                    {filters.map(filter => (
                        <button
                            key={filter}
                            style={filterButtonStyle(selectedFilter === filter)}
                            onClick={() => setSelectedFilter(filter)}
                            onMouseEnter={(e) => {
                                if (selectedFilter !== filter) {
                                    e.target.style.background = 'rgba(139, 92, 246, 0.2)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedFilter !== filter) {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Topics Grid */}
                <div style={topicsGridStyle}>
                    {filteredTopics.map((topic, index) => (
                        <a
                            key={topic.id}
                            href={`/problem?topic=${topic.id}`}
                            style={topicCardStyle(topic, index)}
                            onMouseEnter={(e) => {
                                setHoveredTopic(topic.id);
                                e.target.style.transform = 'translateY(-8px) scale(1.02)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = `0 20px 40px ${topic.color}30`;
                                e.target.style.border = `1px solid ${topic.color}80`;
                            }}
                            onMouseLeave={(e) => {
                                setHoveredTopic(null);
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.target.style.boxShadow = 'none';
                                e.target.style.border = `1px solid ${topic.color}40`;
                            }}
                        >
                            <div style={topicIconStyle}>{topic.icon}</div>
                            <h3 style={topicTitleStyle}>{topic.title}</h3>
                            <p style={topicDescriptionStyle}>{topic.description}</p>

                            <div style={topicMetaStyle}>
                                <span style={difficultyBadgeStyle(topic.difficulty)}>
                                    {topic.difficulty}
                                </span>
                                <span style={durationStyle}>
                                    ⏱️ {topic.duration}
                                </span>
                            </div>

                            <div
                                style={{
                                    ...progressBarStyle,
                                    width: hoveredTopic === topic.id ? '100%' : '0%'
                                }}
                            />
                        </a>
                    ))}
                </div>

                {/* Call to Action */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '80px',
                    padding: '48px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    borderRadius: '24px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                    <h2 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        marginBottom: '16px',
                        color: 'white'
                    }}>
                        Ready to Start Coding?
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '32px',
                        maxWidth: '500px',
                        margin: '0 auto 32px auto'
                    }}>
                        Pick any topic above and begin your journey to becoming a Python expert with our AI-powered learning platform.
                    </p>
                    <button style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px) scale(1.05)';
                            e.target.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
                        }}
                    >
                        🚀 Get Started Now
                    </button>
                </div>
            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                @media (max-width: 768px) {
                    .topics-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .filter-container {
                        gap: 8px;
                    }
                    
                    .stats-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 480px) {
                    .content {
                        padding: 0 20px 40px 20px;
                    }
                    
                    .header {
                        padding: 40px 20px;
                    }
                    
                    .stats-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default CoursePage;