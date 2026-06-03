import React, { useState, useEffect } from 'react';

export default function LessonView({ lesson, activeGrade, onBack, onNextStep }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Can be used for flipping effects

  const vocabList = lesson.vocabulary || [];
  const activeWord = vocabList[currentIndex];

  useEffect(() => {
    // Reset index when lesson changes
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [lesson]);

  const speakGerman = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      
      // Try to find a premium German voice in the browser list
      const voices = window.speechSynthesis.getVoices();
      const deVoice = voices.find(v => v.lang.startsWith('de'));
      if (deVoice) {
        utterance.voice = deVoice;
      }
      
      // Set reasonable speed for kids learning
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser.');
    }
  };

  // Play pronunciation on word load automatically (optional, let's trigger it on first click or when index changes to make it responsive)
  useEffect(() => {
    if (activeWord) {
      // Small timeout to allow voices to load
      const t = setTimeout(() => {
        speakGerman(activeWord.german);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [currentIndex, activeWord]);

  if (!activeWord) {
    return (
      <div className="lesson-container">
        <h2>No vocabulary items found for this lesson!</h2>
        <button className="action-btn" onClick={onBack}>Back to Map</button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Proceed to the interactive game phase!
      onNextStep('games');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressPercent = ((currentIndex + 1) / vocabList.length) * 100;

  return (
    <div className="lesson-container" style={{ '--active-theme-color': activeGrade.theme.primary, '--active-theme-glow': activeGrade.theme.glow }}>
      <div className="lesson-top-bar">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back to Map
        </button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
          {currentIndex + 1} / {vocabList.length}
        </div>
      </div>

      <div className="map-header" style={{ marginBottom: '0.5rem' }}>
        <h2 className="font-playful" style={{ color: activeGrade.theme.primary }}>{lesson.title}</h2>
        <p>Listen and repeat! Click the card to hear it again.</p>
      </div>

      <div className="flashcard-section">
        <div className="card-deck">
          <div 
            className="vocab-card" 
            onClick={() => speakGerman(activeWord.german)}
          >
            {activeWord.gender && activeWord.gender !== 'none' && (
              <span className={`gender-badge ${activeWord.gender}`}>
                {activeWord.gender} (Noun)
              </span>
            )}
            
            <div className="word-german">
              {activeWord.gender && activeWord.gender !== 'none' && (
                <span className={`gender-prefix ${activeWord.gender}`}>{activeWord.gender} </span>
              )}
              {activeWord.german}
            </div>

            <button 
              className="audio-trigger" 
              onClick={(e) => {
                e.stopPropagation(); // Avoid double speech trigger from card click
                speakGerman(activeWord.german);
              }}
              title="Listen pronunciation"
            >
              🔊
            </button>

            <div className="word-english">{activeWord.english}</div>

            {activeWord.example && (
              <div className="example-box">
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: activeGrade.theme.primary, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Example Context:</div>
                <div className="example-de">{activeWord.example}</div>
                <div className="example-en">{activeWord.exampleEnglish}</div>
              </div>
            )}
          </div>
        </div>

        <div className="card-nav">
          <button 
            className="nav-arrow" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            title="Previous word"
          >
            ◀
          </button>
          
          <div className="card-dots">
            {vocabList.map((_, idx) => (
              <div 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
              ></div>
            ))}
          </div>

          <button 
            className="nav-arrow" 
            onClick={handleNext}
            title={currentIndex === vocabList.length - 1 ? "Start Games" : "Next word"}
          >
            {currentIndex === vocabList.length - 1 ? '🎮' : '▶'}
          </button>
        </div>

        {currentIndex === vocabList.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button className="action-btn" onClick={() => onNextStep('games')}>
              Play Interactive Games! 🎮
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
