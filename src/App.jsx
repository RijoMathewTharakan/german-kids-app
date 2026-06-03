import React, { useState, useEffect } from 'react';
import { initialCurriculum } from './data/mockCurriculum';
import StudentMap from './components/StudentMap';
import LessonView from './components/LessonView';
import InteractiveGames from './components/InteractiveGames';
import QuizView from './components/QuizView';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // 1. State: Curriculum database (persists in localStorage)
  const [curriculum, setCurriculum] = useState(() => {
    const saved = localStorage.getItem('mes_german_curriculum');
    return saved ? JSON.parse(saved) : initialCurriculum;
  });

  // 2. State: Selected Grade
  const [selectedGradeId, setSelectedGradeId] = useState('grade-4');

  // 3. State: Student learning metrics (persists in localStorage)
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('mes_german_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [userXp, setUserXp] = useState(() => {
    const saved = localStorage.getItem('mes_german_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState(5); // Default funny gamified streak

  // 4. State: View Navigation ('map', 'learn', 'games', 'quiz', 'admin')
  const [currentView, setCurrentView] = useState('map');
  const [activeLesson, setActiveLesson] = useState(null);

  // 5. State: Admin Authentication Gate
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Save states to localStorage on change
  useEffect(() => {
    localStorage.setItem('mes_german_curriculum', JSON.stringify(curriculum));
  }, [curriculum]);

  useEffect(() => {
    localStorage.setItem('mes_german_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('mes_german_xp', userXp.toString());
  }, [userXp]);

  const activeGrade = curriculum[selectedGradeId];

  // Dynamic Theme Colors: Apply to Document Root for CSS access
  useEffect(() => {
    if (activeGrade && activeGrade.theme) {
      const root = document.documentElement;
      root.style.setProperty('--glow-color', activeGrade.theme.glow);
      root.style.setProperty('--active-gradient', activeGrade.theme.gradient);
      root.style.setProperty('--active-theme-color', activeGrade.theme.primary);
      root.style.setProperty('--active-theme-glow', activeGrade.theme.glow);
    }
  }, [selectedGradeId, curriculum, activeGrade]);

  // Navigation handlers
  const handleStartLesson = (lesson, step) => {
    setActiveLesson(lesson);
    setCurrentView(step);
  };

  const handleQuizComplete = (lessonId, xpEarned) => {
    // Add lesson to completed list if not already there
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    setUserXp(userXp + xpEarned);
    setCurrentView('map');
    setActiveLesson(null);
  };

  // Admin Dashboard Actions
  const handleAddLesson = (gradeId, newLesson) => {
    const updatedCurriculum = { ...curriculum };
    updatedCurriculum[gradeId].lessons.push(newLesson);
    setCurriculum(updatedCurriculum);
  };

  const handleDeleteLesson = (gradeId, lessonId) => {
    const updatedCurriculum = { ...curriculum };
    updatedCurriculum[gradeId].lessons = updatedCurriculum[gradeId].lessons.filter(l => l.id !== lessonId);
    // Remove from completed if deleted
    setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    setCurriculum(updatedCurriculum);
  };

  // PIN Access authentication
  const handleAdminTabClick = () => {
    if (isAdminUnlocked) {
      setCurrentView('admin');
    } else {
      setShowPinModal(true);
      setPinInput('');
      setPinError('');
    }
  };

  const handlePinSubmit = () => {
    // Teacher PIN is either "1234" or "mesadmin"
    if (pinInput === '1234' || pinInput === 'mesadmin') {
      setIsAdminUnlocked(true);
      setShowPinModal(false);
      setCurrentView('admin');
    } else {
      setPinError('Incorrect password/PIN! Try "mesadmin" or "1234".');
      setPinInput('');
    }
  };

  return (
    <div className="app-container">
      {/* Navbar header for teacher/school branding */}
      <header className="navbar">
        <div className="school-info">
          <span className="school-name">MES International School, Pattambi</span>
          <span className="teacher-name">Herr Rijo Mathew Tharakan</span>
        </div>

        <div className="navbar-actions">
          <button 
            className={`mode-btn ${currentView !== 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('map')}
          >
            🏫 Kids Classroom Board
          </button>
          <button 
            className={`mode-btn ${currentView === 'admin' ? 'active' : ''}`}
            onClick={handleAdminTabClick}
          >
            ⚙ Teacher Dashboard
          </button>
        </div>
      </header>

      {/* Grade switcher (Visible only when in student mode / map view) */}
      {currentView === 'map' && (
        <div className="grade-selector">
          {Object.keys(curriculum).map(gradeKey => {
            const grade = curriculum[gradeKey];
            const isActive = selectedGradeId === gradeKey;
            
            return (
              <button
                key={gradeKey}
                className={`grade-tab ${isActive ? 'active' : ''}`}
                style={{
                  color: isActive ? '#fff' : grade.theme.primary,
                  '--glow-color': grade.theme.glow,
                  '--active-gradient': grade.theme.gradient
                }}
                onClick={() => setSelectedGradeId(gradeKey)}
              >
                {grade.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Classroom stats bar (Only in Student Map View) */}
      {currentView === 'map' && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 2rem' }}>
          <div className="stats-header">
            <div className="stat-item stat-xp">
              ⭐ Class Points: {userXp} XP
            </div>
            <div className="stat-item font-playful" style={{ fontSize: '1.5rem', color: '#fff' }}>
              🇩🇪 German Deutsch Portal
            </div>
            <div className="stat-item stat-streak">
              🔥 Learning Streak: {streak} Days
            </div>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="main-content">
        {currentView === 'map' && (
          <StudentMap 
            activeGrade={activeGrade} 
            completedLessons={completedLessons}
            onStartLesson={handleStartLesson}
            userXp={userXp}
          />
        )}

        {currentView === 'learn' && activeLesson && (
          <LessonView 
            lesson={activeLesson}
            activeGrade={activeGrade}
            onBack={() => {
              setCurrentView('map');
              setActiveLesson(null);
            }}
            onNextStep={(step) => setCurrentView(step)}
          />
        )}

        {currentView === 'games' && activeLesson && (
          <InteractiveGames 
            lesson={activeLesson}
            activeGrade={activeGrade}
            onBack={() => {
              setCurrentView('map');
              setActiveLesson(null);
            }}
            onNextStep={(step) => setCurrentView(step)}
          />
        )}

        {currentView === 'quiz' && activeLesson && (
          <QuizView 
            lesson={activeLesson}
            activeGrade={activeGrade}
            onBack={() => {
              setCurrentView('map');
              setActiveLesson(null);
            }}
            onComplete={handleQuizComplete}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            curriculum={curriculum}
            onAddLesson={handleAddLesson}
            onDeleteLesson={handleDeleteLesson}
          />
        )}
      </main>

      {/* Teacher Authentication PIN Overlay Dialog */}
      {showPinModal && (
        <div className="pin-screen-overlay">
          <div className="pin-card">
            <div className="pin-title font-playful">🔑 Teacher Login Required</div>
            <p style={{ color: 'var(--text-muted)' }}>
              Enter password to access the MES lesson editor dashboard.
            </p>
            
            <input 
              type="password" 
              className="input-field" 
              placeholder="e.g. mesadmin"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
              style={{ textAlign: 'center', letterSpacing: '2px', fontSize: '1.25rem' }}
            />

            {pinError && <div className="pin-error-msg">{pinError}</div>}

            <div className="pin-btn-container">
              <button 
                className="pin-btn pin-btn-cancel" 
                onClick={() => setShowPinModal(false)}
              >
                Cancel
              </button>
              <button 
                className="pin-btn pin-btn-submit" 
                onClick={handlePinSubmit}
              >
                Login
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)' }}>
              (Default login: <strong>mesadmin</strong>)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
