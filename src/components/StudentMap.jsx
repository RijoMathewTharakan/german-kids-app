import React, { useState } from 'react';

export default function StudentMap({ activeGrade, completedLessons, onStartLesson, userXp }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const lessons = activeGrade.lessons || [];

  const handleNodeClick = (lesson, index, isLocked) => {
    if (isLocked) return;
    if (selectedNode && selectedNode.id === lesson.id) {
      setSelectedNode(null);
    } else {
      setSelectedNode({ ...lesson, index });
    }
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h2 className="font-playful" style={{ color: activeGrade.theme.primary }}>
          {activeGrade.name} Path
        </h2>
        <p>{activeGrade.description}</p>
      </div>

      <div className="map-path">
        {lessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          // Standard Duolingo lock logic: first is unlocked, or if previous is completed
          const isLocked = idx > 0 && !completedLessons.includes(lessons[idx - 1].id);
          const isActive = !isLocked && !isCompleted;

          // Horizontal zigzag offset for typical Duolingo path visual
          const horizontalOffset = idx % 2 === 0 ? '-35px' : '35px';

          // Assign styling variables inline
          const nodeStyle = {
            '--active-color': activeGrade.theme.primary,
            '--border-color': activeGrade.theme.secondary,
            '--shadow-color': activeGrade.theme.secondary,
            '--glow-color': activeGrade.theme.glow,
            transform: `translateX(${isLocked ? '0px' : horizontalOffset})`,
            color: isLocked ? '#64748b' : '#fff'
          };

          return (
            <div key={lesson.id} className="node-wrapper" style={{ position: 'relative' }}>
              <button
                className={`map-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active-node' : ''} ${isLocked ? 'locked' : ''}`}
                style={nodeStyle}
                onClick={() => handleNodeClick(lesson, idx, isLocked)}
                disabled={isLocked}
                title={lesson.title}
              >
                {isLocked ? '🔒' : lesson.icon || '📚'}
              </button>

              {/* Node Card Popup when clicked */}
              {selectedNode && selectedNode.id === lesson.id && (
                <div 
                  className="node-label-card expanded"
                  style={{
                    transform: `translateX(${horizontalOffset})`,
                    borderColor: activeGrade.theme.primary,
                    borderWidth: '2px',
                    width: '320px',
                    maxWidth: '90vw',
                    position: 'relative',
                    zIndex: 20
                  }}
                >
                  <h4 className="font-playful" style={{ cursor: 'pointer' }} onClick={() => handleNodeClick(lesson, idx, isLocked)}>
                    {lesson.title}
                  </h4>
                  <p style={{ margin: '0.5rem 0' }}>{lesson.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
                    <button
                      className="action-btn"
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.9rem',
                        minHeight: '45px',
                        background: activeGrade.theme.primary,
                        color: '#fff',
                        flex: 1
                      }}
                      onClick={() => {
                        onStartLesson(lesson, 'learn');
                        setSelectedNode(null);
                      }}
                    >
                      📖 Learn
                    </button>
                    {isCompleted && (
                      <button
                        className="action-btn"
                        style={{
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.9rem',
                          minHeight: '45px',
                          background: '#fff',
                          color: '#0f172a',
                          flex: 1
                        }}
                        onClick={() => {
                          onStartLesson(lesson, 'games');
                          setSelectedNode(null);
                        }}
                      >
                        🎮 Games
                      </button>
                    )}
                    <button
                      className="action-btn"
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.9rem',
                        minHeight: '45px',
                        background: activeGrade.theme.accent || '#ffd066',
                        color: '#0f172a',
                        flex: 1
                      }}
                      onClick={() => {
                        onStartLesson(lesson, 'quiz');
                        setSelectedNode(null);
                      }}
                    >
                      📝 Quiz
                    </button>
                  </div>
                </div>
              )}

              {/* Standard text label under node if not selected, for clarity */}
              {(!selectedNode || selectedNode.id !== lesson.id) && (
                <div 
                  className="node-label-card" 
                  style={{ 
                    transform: `translateX(${isLocked ? '0px' : horizontalOffset})`,
                    cursor: isLocked ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => handleNodeClick(lesson, idx, isLocked)}
                >
                  <h4>{lesson.title.split(' - ')[0]}</h4>
                  <p>{isCompleted ? '✅ Finished (+50 XP)' : isLocked ? 'Locked' : '🌟 Start Learning'}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
