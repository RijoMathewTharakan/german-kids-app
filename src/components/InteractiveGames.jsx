import React, { useState, useEffect } from 'react';

// Simple web-audio sound effects generator for games
const playSynthSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
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
    }
  } catch (e) {
    console.error('Audio Context Error', e);
  }
};

export default function InteractiveGames({ lesson, activeGrade, onBack, onNextStep }) {
  const [activeGame, setActiveGame] = useState('match'); // 'match', 'sentence', 'memory'
  
  // Game 1 State: Matching
  const [germanMatchList, setGermanMatchList] = useState([]);
  const [englishMatchList, setEnglishMatchList] = useState([]);
  const [selectedGerman, setSelectedGerman] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]); // IDs of matched vocab
  const [matchGameComplete, setMatchGameComplete] = useState(false);

  // Game 2 State: Sentence Builder
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(0);
  const [constructedSentence, setConstructedSentence] = useState([]);
  const [wordPool, setWordPool] = useState([]);
  const [sentenceCheckState, setSentenceCheckState] = useState(null); // 'correct', 'incorrect', null
  const [sentenceComplete, setSentenceComplete] = useState(false);

  // Game 3 State: Memory Game
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedMemoryKeys, setMatchedMemoryKeys] = useState([]);
  const [memoryGameComplete, setMemoryGameComplete] = useState(false);

  // Initialize games
  useEffect(() => {
    initMatchGame();
    initSentenceGame();
    initMemoryGame();
  }, [lesson, activeGame]);

  // --- 1. WORD MATCH GAME LOGIC ---
  const initMatchGame = () => {
    const list = lesson.vocabulary.slice(0, 5); // Take max 5 items
    
    // Create lists with vocab ID and text
    const deList = list.map(v => ({ id: v.german, text: v.german, gender: v.gender }));
    const enList = list.map(v => ({ id: v.german, text: v.english }));
    
    // Shuffle lists
    setGermanMatchList(deList.sort(() => Math.random() - 0.5));
    setEnglishMatchList(enList.sort(() => Math.random() - 0.5));
    setMatchedIds([]);
    setSelectedGerman(null);
    setSelectedEnglish(null);
    setMatchGameComplete(false);
  };

  const handleGermanMatchClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    playSynthSound('click');
    setSelectedGerman(item.id);
    
    // Instant matching check if English was already selected
    if (selectedEnglish) {
      checkMatch(item.id, selectedEnglish);
    }
  };

  const handleEnglishMatchClick = (item) => {
    if (matchedIds.includes(item.id)) return;
    playSynthSound('click');
    setSelectedEnglish(item.id);
    
    // Instant matching check if German was already selected
    if (selectedGerman) {
      checkMatch(selectedGerman, item.id);
    }
  };

  const checkMatch = (deId, enId) => {
    if (deId === enId) {
      // Success match!
      playSynthSound('success');
      const newMatches = [...matchedIds, deId];
      setMatchedIds(newMatches);
      
      if (newMatches.length === germanMatchList.length) {
        setMatchGameComplete(true);
      }
    } else {
      // Mis-match!
      playSynthSound('fail');
    }
    
    // Reset selection after delay
    setTimeout(() => {
      setSelectedGerman(null);
      setSelectedEnglish(null);
    }, 250);
  };

  // --- 2. SENTENCE BUILDER LOGIC ---
  const initSentenceGame = () => {
    const phrases = lesson.phrases || [];
    if (phrases.length === 0) {
      setSentenceComplete(true);
      return;
    }
    
    const activePhrase = phrases[activeSentenceIdx % phrases.length];
    
    // Clean string & split into word blocks
    const correctWords = activePhrase.german
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .split(/\s+/);
      
    // Create random pool (we can add a couple of extra distractor words if desired)
    let pool = [...correctWords];
    if (pool.length < 5) {
      pool.push("nicht", "sehr", "ist", "und");
      pool = Array.from(new Set(pool)); // Remove duplicates
    }
    
    // Shuffle pool
    setWordPool(pool.sort(() => Math.random() - 0.5));
    setConstructedSentence([]);
    setSentenceCheckState(null);
    setSentenceComplete(false);
  };

  const handleWordBlockClick = (word, fromPool) => {
    playSynthSound('click');
    setSentenceCheckState(null);
    
    if (fromPool) {
      // Remove one instance from wordPool
      const idx = wordPool.indexOf(word);
      const newPool = [...wordPool];
      newPool.splice(idx, 1);
      setWordPool(newPool);
      setConstructedSentence([...constructedSentence, word]);
    } else {
      // Put back to wordPool
      const idx = constructedSentence.indexOf(word);
      const newConstructed = [...constructedSentence];
      newConstructed.splice(idx, 1);
      setConstructedSentence(newConstructed);
      setWordPool([...wordPool, word]);
    }
  };

  const checkSentence = () => {
    const phrases = lesson.phrases || [];
    const activePhrase = phrases[activeSentenceIdx % phrases.length];
    
    const correctSentenceClean = activePhrase.german
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
      
    const currentSentenceClean = constructedSentence
      .join(" ")
      .trim()
      .toLowerCase();

    if (currentSentenceClean === correctSentenceClean) {
      playSynthSound('success');
      setSentenceCheckState('correct');
      
      // Auto advance or show complete
      if ((activeSentenceIdx + 1) >= Math.min(phrases.length, 3)) {
        setSentenceComplete(true);
      } else {
        setTimeout(() => {
          setActiveSentenceIdx(activeSentenceIdx + 1);
          setConstructedSentence([]);
          setSentenceCheckState(null);
        }, 1200);
      }
    } else {
      playSynthSound('fail');
      setSentenceCheckState('incorrect');
    }
  };

  // --- 3. MEMORY GAME LOGIC ---
  const initMemoryGame = () => {
    const list = lesson.vocabulary.slice(0, 4); // 4 items = 8 cards grid (perfect size for panel)
    
    const deck = [];
    list.forEach(v => {
      // German Card
      deck.push({
        id: `${v.german}-de`,
        matchKey: v.german,
        text: v.german,
        gender: v.gender,
        lang: 'de'
      });
      // English Card
      deck.push({
        id: `${v.german}-en`,
        matchKey: v.german,
        text: v.english,
        lang: 'en'
      });
    });

    // Shuffle deck
    setMemoryCards(deck.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
    setMatchedMemoryKeys([]);
    setMemoryGameComplete(false);
  };

  const handleMemoryCardClick = (idx) => {
    if (flippedIndices.includes(idx) || flippedIndices.length >= 2) return;
    const card = memoryCards[idx];
    if (matchedMemoryKeys.includes(card.matchKey)) return;

    playSynthSound('click');
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = memoryCards[newFlipped[0]];
      const card2 = memoryCards[newFlipped[1]];

      if (card1.matchKey === card2.matchKey) {
        // Match!
        playSynthSound('success');
        const newMatched = [...matchedMemoryKeys, card1.matchKey];
        setMatchedMemoryKeys(newMatched);
        setFlippedIndices([]);
        
        if (newMatched.length === memoryCards.length / 2) {
          setMemoryGameComplete(true);
        }
      } else {
        // No match
        playSynthSound('fail');
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const gameTitles = {
    match: "Wort-Zuordnung (Word Match)",
    sentence: "Satz-Bauer (Sentence Builder)",
    memory: "Gedächtnisspiel (Memory Match)"
  };

  return (
    <div className="lesson-container">
      <div className="lesson-top-bar">
        <button className="back-btn" onClick={onBack}>
          ⬅ Back to Map
        </button>
        <div className="font-playful" style={{ fontSize: '1.25rem', color: activeGrade.theme.primary }}>
          {lesson.title.split(' - ')[0]} Games
        </div>
        <button className="action-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.95rem', minHeight: '40px', background: activeGrade.theme.accent }} onClick={() => onNextStep('quiz')}>
          📝 Skip to Quiz
        </button>
      </div>

      <h2 className="games-hub-title font-playful">🎮 Interactive Games</h2>

      {/* Game tab selector */}
      <div className="game-tab-bar">
        <button 
          className={`game-btn ${activeGame === 'match' ? 'active' : ''}`}
          onClick={() => setActiveGame('match')}
        >
          🔀 Word Match
        </button>
        <button 
          className={`game-btn ${activeGame === 'sentence' ? 'active' : ''}`}
          onClick={() => setActiveGame('sentence')}
        >
          🧩 Sentence Builder
        </button>
        <button 
          className={`game-btn ${activeGame === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveGame('memory')}
        >
          🃏 Memory Cards
        </button>
      </div>

      {/* Main Game Screen */}
      <div className="admin-card" style={{ padding: '2.5rem', background: 'rgba(30, 41, 59, 0.4)' }}>
        <h3 className="font-playful" style={{ color: activeGrade.theme.primary, justifyContent: 'center' }}>
          {gameTitles[activeGame]}
        </h3>

        {/* 1. MATCH GAME VIEW */}
        {activeGame === 'match' && (
          <div>
            {!matchGameComplete ? (
              <div className="matching-game">
                <div className="match-column">
                  <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}>Deutsch</div>
                  {germanMatchList.map(item => (
                    <div
                      key={item.id}
                      className={`match-item ${selectedGerman === item.id ? 'selected' : ''} ${matchedIds.includes(item.id) ? 'matched' : ''}`}
                      onClick={() => handleGermanMatchClick(item)}
                    >
                      {item.gender && item.gender !== 'none' && (
                        <span className={`gender-prefix ${item.gender}`} style={{ marginRight: '0.3rem' }}>{item.gender}</span>
                      )}
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="match-column">
                  <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}>English</div>
                  {englishMatchList.map(item => (
                    <div
                      key={item.text}
                      className={`match-item ${selectedEnglish === item.id ? 'selected' : ''} ${matchedIds.includes(item.id) ? 'matched' : ''}`}
                      onClick={() => handleEnglishMatchClick(item)}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                <h4 className="font-playful" style={{ fontSize: '1.75rem', color: 'var(--success)', marginBottom: '1rem' }}>Grossartig! (Excellent!)</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You matched all vocabulary words correctly.</p>
                <button className="action-btn" onClick={() => setActiveGame('sentence')}>
                  Next: Sentence Builder 🧩
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. SENTENCE BUILDER VIEW */}
        {activeGame === 'sentence' && (
          <div>
            {lesson.phrases && lesson.phrases.length > 0 ? (
              <div>
                {!sentenceComplete ? (
                  <div className="sentence-builder-game">
                    <div className="sentence-target">
                      Translate: <strong>{lesson.phrases[activeSentenceIdx % lesson.phrases.length].english}</strong>
                    </div>

                    <div className="slots-container">
                      {constructedSentence.map((word, idx) => (
                        <button
                          key={idx}
                          className="word-block"
                          onClick={() => handleWordBlockClick(word, false)}
                        >
                          {word}
                        </button>
                      ))}
                      {constructedSentence.length === 0 && (
                        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1rem' }}>Tap words from below to construct sentence...</span>
                      )}
                    </div>

                    <div className="pool-container">
                      {wordPool.map((word, idx) => (
                        <button
                          key={idx}
                          className="word-block"
                          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                          onClick={() => handleWordBlockClick(word, true)}
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    {sentenceCheckState && (
                      <div className={`quiz-feedback ${sentenceCheckState}`}>
                        {sentenceCheckState === 'correct' ? '🎉 Das ist richtig! (Correct!)' : '❌ Versuche es noch einmal. (Try again.)'}
                      </div>
                    )}

                    <div className="check-btn-container">
                      <button 
                        className="action-btn" 
                        onClick={checkSentence}
                        disabled={constructedSentence.length === 0}
                      >
                        Check Sentence ✔
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                    <h4 className="font-playful" style={{ fontSize: '1.75rem', color: 'var(--success)', marginBottom: '1rem' }}>Wunderbar! (Wonderful!)</h4>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You built all sentences perfectly.</p>
                    <button className="action-btn" onClick={() => setActiveGame('memory')}>
                      Next: Memory Cards 🃏
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p>No phrases available to construct for this lesson.</p>
                <button className="action-btn" onClick={() => setActiveGame('memory')}>Go to Memory Game</button>
              </div>
            )}
          </div>
        )}

        {/* 3. MEMORY CARD VIEW */}
        {activeGame === 'memory' && (
          <div>
            {!memoryGameComplete ? (
              <div>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Match the German words with their English translations! Pairs matched: {matchedMemoryKeys.length} / 4
                </p>
                <div className="memory-grid">
                  {memoryCards.map((card, idx) => {
                    const isFlipped = flippedIndices.includes(idx);
                    const isMatched = matchedMemoryKeys.includes(card.matchKey);
                    
                    return (
                      <div 
                        key={card.id} 
                        className={`memory-card-wrapper ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                        onClick={() => handleMemoryCardClick(idx)}
                      >
                        <div className="memory-card">
                          <div className="memory-card-face memory-card-front">
                            🇩🇪
                          </div>
                          <div className="memory-card-face memory-card-back">
                            {card.gender && card.gender !== 'none' && (
                              <span className={`gender-prefix ${card.gender}`} style={{ display: 'block', fontSize: '0.8rem' }}>{card.gender} </span>
                            )}
                            {card.text}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h4 className="font-playful" style={{ fontSize: '1.75rem', color: 'var(--success)', marginBottom: '1rem' }}>Super! Du bist genial!</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You finished all interactive games. Ready for the quiz?</p>
                <button className="action-btn" onClick={() => onNextStep('quiz')}>
                  Go to Quiz 📝
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
