import React, { useState, useEffect, useRef } from 'react';

// Sound Synthesizer Player
const playQuizSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(450, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(600, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } else if (type === 'fanfare') {
      // Big win sound
      osc.type = 'square';
      osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
      osc.frequency.setValueAtTime(329.63, ctx.currentTime + 0.1); // E4
      osc.frequency.setValueAtTime(392.00, ctx.currentTime + 0.2); // G4
      osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.3); // C5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    }
  } catch (e) {
    console.error('Audio Context Error', e);
  }
};

// Canvas-based Confetti System for rewarding classroom experience
const ConfettiCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        // Recycle particles
        if (p.y > canvas.height) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngleIncremental: p.tiltAngleIncremental,
            tiltAngle: p.tiltAngle
          };
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', borderRadius: '24px' }} />;
};

export default function QuizView({ lesson, activeGrade, onBack, onComplete }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Sentence Builder Sub-State (for sentence builder quiz types)
  const [constructedWords, setConstructedWords] = useState([]);
  const [poolWords, setPoolWords] = useState([]);

  const quizList = lesson.quiz || [];
  const activeQuestion = quizList[currentQuestionIdx];

  // Initialize/Reset states for question
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);

    if (activeQuestion && activeQuestion.type === 'sentence-builder') {
      const correctWords = activeQuestion.correctAnswer
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .split(/\s+/);
      
      let pool = [...correctWords];
      if (pool.length < 5) {
        pool.push("nicht", "sehr", "ist", "und");
        pool = Array.from(new Set(pool));
      }
      setPoolWords(pool.sort(() => Math.random() - 0.5));
      setConstructedWords([]);
    }
  }, [currentQuestionIdx, activeQuestion]);

  if (quizList.length === 0) {
    return (
      <div className="reward-screen">
        <h2>No quiz questions available for this lesson yet!</h2>
        <button className="action-btn" onClick={onBack}>Back to Map</button>
      </div>
    );
  }

  const handleOptionClick = (option) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleWordBlockClick = (word, fromPool) => {
    if (isAnswerChecked) return;
    if (fromPool) {
      const idx = poolWords.indexOf(word);
      const newPool = [...poolWords];
      newPool.splice(idx, 1);
      setPoolWords(newPool);
      setConstructedWords([...constructedWords, word]);
    } else {
      const idx = constructedWords.indexOf(word);
      const newConstructed = [...constructedWords];
      newConstructed.splice(idx, 1);
      setConstructedWords(newConstructed);
      setPoolWords([...poolWords, word]);
    }
  };

  const checkAnswer = () => {
    if (isAnswerChecked) return;

    let answerIsCorrect = false;

    if (activeQuestion.type === 'multiple-choice' || activeQuestion.type === 'fill-in-the-blank') {
      answerIsCorrect = selectedOption === activeQuestion.correctAnswer;
    } else if (activeQuestion.type === 'sentence-builder') {
      const correctClean = activeQuestion.correctAnswer
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      const currentClean = constructedWords.join(" ").trim().toLowerCase();
      answerIsCorrect = currentClean === correctClean;
    }

    setIsCorrect(answerIsCorrect);
    setIsAnswerChecked(true);

    if (answerIsCorrect) {
      playQuizSound('success');
      setScore(score + 1);
    } else {
      playQuizSound('fail');
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizList.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
      playQuizSound('fanfare');
    }
  };

  const progressPercent = ((currentQuestionIdx) / quizList.length) * 100;

  if (quizFinished) {
    const perfectScore = score === quizList.length;
    const finalXp = lesson.xp + (perfectScore ? 20 : 0);

    return (
      <div 
        className="reward-screen" 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          maxWidth: '550px', 
          width: '100%', 
          margin: '2rem auto',
          '--active-theme-color': activeGrade.theme.primary
        }}
      >
        <ConfettiCanvas />
        <div className="trophy-icon">🏆</div>
        <h2 className="reward-title font-playful">Gut gemacht!</h2>
        <h4 style={{ fontSize: '1.5rem', color: '#fff' }}>
          You completed the {lesson.title.split(' - ')[0]} Quiz!
        </h4>
        
        <div style={{ fontSize: '1.25rem', margin: '0.5rem 0', color: 'var(--text-muted)' }}>
          Score: <strong style={{ color: activeGrade.theme.primary, fontSize: '1.5rem' }}>{score} / {quizList.length}</strong>
        </div>

        {perfectScore && (
          <div style={{ color: 'var(--xp-color)', fontWeight: 700, fontSize: '1.1rem' }}>
            🌟 Perfect Score Bonus! (+20 XP) 🌟
          </div>
        )}

        <div className="xp-granted">
          +{finalXp} XP
        </div>

        <button 
          className="action-btn"
          style={{ width: '100%', background: activeGrade.theme.primary, color: '#fff', zIndex: 10 }}
          onClick={() => onComplete(lesson.id, finalXp)}
        >
          Finish & Save Progress 🚀
        </button>
      </div>
    );
  }

  // Determine button state
  const isSubmitDisabled = 
    (activeQuestion.type === 'multiple-choice' || activeQuestion.type === 'fill-in-the-blank') ? selectedOption === null :
    (activeQuestion.type === 'sentence-builder') ? constructedWords.length === 0 : true;

  return (
    <div className="quiz-section" style={{ '--active-theme-color': activeGrade.theme.primary, '--active-theme-glow': activeGrade.theme.glow }}>
      <div className="lesson-top-bar">
        <button className="back-btn" onClick={onBack}>
          ⬅ Quit Quiz
        </button>
        <div className="progress-track" style={{ margin: '0 1.5rem' }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
          Q: {currentQuestionIdx + 1} / {quizList.length}
        </div>
      </div>

      <div className="quiz-card">
        <div style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: activeGrade.theme.primary, fontWeight: 700, letterSpacing: '1px', marginBottom: '0.5rem' }}>
          Question Challenge
        </div>
        <h3 className="quiz-question-title font-playful">{activeQuestion.question}</h3>

        {/* Multiple Choice Layout */}
        {activeQuestion.type === 'multiple-choice' && (
          <div className="quiz-options-list">
            {activeQuestion.options.map(option => {
              const isSelected = selectedOption === option;
              let optionClass = '';
              if (isAnswerChecked) {
                if (option === activeQuestion.correctAnswer) optionClass = 'correct';
                else if (isSelected) optionClass = 'incorrect';
                optionClass += ' checked';
              } else if (isSelected) {
                optionClass = 'selected';
              }
              
              return (
                <button
                  key={option}
                  className={`quiz-option-btn ${optionClass}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswerChecked}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Fill-in-the-blank Layout */}
        {activeQuestion.type === 'fill-in-the-blank' && (
          <div className="quiz-options-list">
            {activeQuestion.options.map(option => {
              const isSelected = selectedOption === option;
              let optionClass = '';
              if (isAnswerChecked) {
                if (option === activeQuestion.correctAnswer) optionClass = 'correct';
                else if (isSelected) optionClass = 'incorrect';
                optionClass += ' checked';
              } else if (isSelected) {
                optionClass = 'selected';
              }
              
              return (
                <button
                  key={option}
                  className={`quiz-option-btn ${optionClass}`}
                  style={{ textAlign: 'center' }}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswerChecked}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Sentence Builder Layout inside Quiz */}
        {activeQuestion.type === 'sentence-builder' && (
          <div className="sentence-builder-game" style={{ gap: '1.25rem' }}>
            <div className="slots-container" style={{ minHeight: '65px', background: 'rgba(0,0,0,0.2)' }}>
              {constructedWords.map((word, idx) => (
                <button
                  key={idx}
                  className="word-block"
                  style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                  onClick={() => handleWordBlockClick(word, false)}
                  disabled={isAnswerChecked}
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="pool-container">
              {poolWords.map((word, idx) => (
                <button
                  key={idx}
                  className="word-block"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', fontSize: '1rem', padding: '0.5rem 1rem' }}
                  onClick={() => handleWordBlockClick(word, true)}
                  disabled={isAnswerChecked}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Answer Checked Feedback Box */}
        {isAnswerChecked && (
          <div style={{ marginTop: '1.5rem' }}>
            <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '🎉 Richtig! Excellent job.' : `❌ Falsch. Correct answer: "${activeQuestion.correctAnswer}"`}
            </div>
            
            {activeQuestion.hint && (
              <div className="quiz-hint-box">
                💡 <strong>Hint:</strong> {activeQuestion.hint}
              </div>
            )}
          </div>
        )}

        {/* Footer Trigger buttons */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          {!isAnswerChecked ? (
            <button 
              className="action-btn"
              style={{ width: '100%', background: activeGrade.theme.primary, color: '#fff' }}
              disabled={isSubmitDisabled}
              onClick={checkAnswer}
            >
              Check Answer ✔
            </button>
          ) : (
            <button 
              className="action-btn"
              style={{ width: '100%', background: '#fff', color: '#0f172a' }}
              onClick={handleNext}
            >
              {currentQuestionIdx === quizList.length - 1 ? 'Show Results 🏆' : 'Next Question ➡'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
