import React, { useState } from 'react';

// Pre-computed high-quality AI responses for topic triggers
const AI_CATALOG = {
  animals: {
    title: "Die Tiere (Animals)",
    icon: "🦁",
    description: "Learn names of common domestic and wild animals in German.",
    vocabulary: [
      { german: "Hund", english: "dog", gender: "der", example: "Der Hund bellt laut.", exampleEnglish: "The dog barks loudly." },
      { german: "Katze", english: "cat", gender: "die", example: "Die Katze schläft auf dem Sofa.", exampleEnglish: "The cat sleeps on the sofa." },
      { german: "Vogel", english: "bird", gender: "der", example: "Der Vogel singt im Baum.", exampleEnglish: "The bird sings in the tree." },
      { german: "Pferd", english: "horse", gender: "das", example: "Das Pferd läuft sehr schnell.", exampleEnglish: "The horse runs very fast." },
      { german: "Maus", english: "mouse", gender: "die", example: "Die Maus isst Käse.", exampleEnglish: "The mouse eats cheese." }
    ],
    phrases: [
      { german: "Ich habe ein Haustier.", english: "I have a pet." },
      { german: "Das ist ein Löwe.", english: "That is a lion." },
      { german: "Wie heißt dein Hund?", english: "What is your dog's name?" }
    ],
    quiz: [
      {
        id: "ai-anim-q1",
        type: "multiple-choice",
        question: "What is the correct German article for 'Katze' (cat)?",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        hint: "Cats are grammatically feminine in German."
      },
      {
        id: "ai-anim-q2",
        type: "multiple-choice",
        question: "What does 'das Pferd' translate to?",
        options: ["The horse", "The dog", "The bird", "The cow"],
        correctAnswer: "The horse",
        hint: "It runs fast and you can ride it."
      },
      {
        id: "ai-anim-q3",
        type: "sentence-builder",
        question: "Arrange to say: 'I have a pet.'",
        options: ["Ich", "habe", "ein", "Haustier."],
        correctAnswer: "Ich habe ein Haustier.",
        hint: "Subject + verb 'habe' + neutral accusative article 'ein'."
      }
    ]
  },
  shopping: {
    title: "Im Supermarkt (Shopping)",
    icon: "🛒",
    description: "Vocabulary and phrases needed to buy groceries and ask for prices.",
    vocabulary: [
      { german: "Supermarkt", english: "supermarket", gender: "der", example: "Der Supermarkt ist groß.", exampleEnglish: "The supermarket is big." },
      { german: "Geld", english: "money", gender: "das", example: "Ich habe kein Geld.", exampleEnglish: "I have no money." },
      { german: "Preis", english: "price", gender: "der", example: "Der Preis ist gut.", exampleEnglish: "The price is good." },
      { german: "kaufen", english: "to buy", gender: "none", example: "Ich kaufe einen Apfel.", exampleEnglish: "I buy an apple." },
      { german: "teuer", english: "expensive", gender: "none", example: "Die Jacke ist teuer.", exampleEnglish: "The jacket is expensive." }
    ],
    phrases: [
      { german: "Wie viel kostet das?", english: "How much does that cost?" },
      { german: "Ich möchte zahlen, bitte.", english: "I would like to pay, please." },
      { german: "Haben Sie Milch?", english: "Do you have milk?" }
    ],
    quiz: [
      {
        id: "ai-shop-q1",
        type: "multiple-choice",
        question: "What does the verb 'kaufen' mean?",
        options: ["To sell", "To pay", "To buy", "To search"],
        correctAnswer: "To buy",
        hint: "Opposite of selling."
      },
      {
        id: "ai-shop-q2",
        type: "multiple-choice",
        question: "How do you ask 'How much does that cost?' in German?",
        options: ["Wie geht es dir?", "Wie viel kostet das?", "Wo ist der Supermarkt?", "Wie heißt du?"],
        correctAnswer: "Wie viel kostet das?",
        hint: "Uses the verb 'kosten'."
      }
    ]
  },
  breakfast: {
    title: "Das Frühstück (Breakfast)",
    icon: "🍳",
    description: "Learn common morning breakfast foods and drinks in German.",
    vocabulary: [
      { german: "Kaffee", english: "coffee", gender: "der", example: "Ich trinke Kaffee.", exampleEnglish: "I drink coffee." },
      { german: "Tee", english: "tea", gender: "der", example: "Der Tee ist heiß.", exampleEnglish: "The tea is hot." },
      { german: "Ei", english: "egg", gender: "das", example: "Ein weiches Ei.", exampleEnglish: "A soft egg." },
      { german: "Marmelade", english: "jam / marmalade", gender: "die", example: "Süße Marmelade.", exampleEnglish: "Sweet jam." },
      { german: "Brötchen", english: "bread roll", gender: "das", example: "Ich esse ein Brötchen.", exampleEnglish: "I eat a bread roll." }
    ],
    phrases: [
      { german: "Was isst du zum Frühstück?", english: "What do you eat for breakfast?" },
      { german: "Ich trinke Milch mit Kakao.", english: "I drink milk with cocoa." },
      { german: "Guten Morgen! Guten Appetit!", english: "Good morning! Enjoy your meal!" }
    ],
    quiz: [
      {
        id: "ai-bf-q1",
        type: "multiple-choice",
        question: "What is 'Brötchen' in English?",
        options: ["Big bread", "Butter", "Bread roll", "Toast"],
        correctAnswer: "Bread roll",
        hint: "The ending '-chen' means it is small."
      },
      {
        id: "ai-bf-q2",
        type: "multiple-choice",
        question: "What is the article of 'Marmelade'?",
        options: ["der", "die", "das"],
        correctAnswer: "die",
        hint: "Feminine gender."
      }
    ]
  },
  music: {
    title: "Die Musik (Music)",
    icon: "🎵",
    description: "Express your musical talents and name instruments in German.",
    vocabulary: [
      { german: "Gitarre", english: "guitar", gender: "die", example: "Ich spiele Gitarre.", exampleEnglish: "I play guitar." },
      { german: "Klavier", english: "piano", gender: "das", example: "Das Klavier klingt schön.", exampleEnglish: "The piano sounds beautiful." },
      { german: "Lied", english: "song", gender: "das", example: "Ich singe ein Lied.", exampleEnglish: "I sing a song." },
      { german: "hören", english: "to hear / listen", gender: "none", example: "Ich höre gern Musik.", exampleEnglish: "I like listening to music." }
    ],
    phrases: [
      { german: "Spielst du ein Instrument?", english: "Do you play an instrument?" },
      { german: "Meine Lieblingsband ist toll.", english: "My favorite band is great." }
    ],
    quiz: [
      {
        id: "ai-mus-q1",
        type: "multiple-choice",
        question: "What is 'piano' in German?",
        options: ["die Gitarre", "das Klavier", "das Lied", "die Geige"],
        correctAnswer: "das Klavier",
        hint: "Starts with K."
      }
    ]
  }
};

export default function AdminDashboard({ curriculum, onAddLesson, onDeleteLesson }) {
  const [selectedGradeId, setSelectedGradeId] = useState("grade-4");
  
  // Manual form states
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonIcon, setLessonIcon] = useState("📚");
  const [lessonDesc, setLessonDesc] = useState("");
  
  // Vocabs builder substate
  const [vocabGerman, setVocabGerman] = useState("");
  const [vocabEnglish, setVocabEnglish] = useState("");
  const [vocabGender, setVocabGender] = useState("none");
  const [vocabExample, setVocabExample] = useState("");
  const [vocabExampleEn, setVocabExampleEn] = useState("");
  const [currentVocabList, setCurrentVocabList] = useState([]);

  // Phrases substate
  const [phraseGerman, setPhraseGerman] = useState("");
  const [phraseEnglish, setPhraseEnglish] = useState("");
  const [currentPhrasesList, setCurrentPhrasesList] = useState([]);

  // Quizzes substate
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizType, setQuizType] = useState("multiple-choice");
  const [quizOptionsStr, setQuizOptionsStr] = useState("");
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState("");
  const [quizHint, setQuizHint] = useState("");
  const [currentQuizList, setCurrentQuizList] = useState([]);

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: "Hallo! I am your AI Teaching Assistant. Enter a topic (e.g. 'animals', 'shopping', 'breakfast', 'music') and I will generate a complete interactive German lesson for your classroom board!" }
  ]);
  const [generatedLesson, setGeneratedLesson] = useState(null);

  // Manual List Addition handlers
  const handleAddVocab = () => {
    if (!vocabGerman || !vocabEnglish) return;
    setCurrentVocabList([...currentVocabList, {
      german: vocabGerman,
      english: vocabEnglish,
      gender: vocabGender,
      example: vocabExample,
      exampleEnglish: vocabExampleEn
    }]);
    setVocabGerman("");
    setVocabEnglish("");
    setVocabGender("none");
    setVocabExample("");
    setVocabExampleEn("");
  };

  const handleAddPhrase = () => {
    if (!phraseGerman || !phraseEnglish) return;
    setCurrentPhrasesList([...currentPhrasesList, {
      german: phraseGerman,
      english: phraseEnglish
    }]);
    setPhraseGerman("");
    setPhraseEnglish("");
  };

  const handleAddQuiz = () => {
    if (!quizQuestion || !quizCorrectAnswer) return;
    const optionsArray = quizOptionsStr ? quizOptionsStr.split(',').map(o => o.trim()) : [];
    setCurrentQuizList([...currentQuizList, {
      id: `man-q-${Date.now()}-${currentQuizList.length}`,
      type: quizType,
      question: quizQuestion,
      options: optionsArray.length > 0 ? optionsArray : [quizCorrectAnswer],
      correctAnswer: quizCorrectAnswer,
      hint: quizHint
    }]);
    setQuizQuestion("");
    setQuizOptionsStr("");
    setQuizCorrectAnswer("");
    setQuizHint("");
  };

  const handleSaveLesson = (e) => {
    e.preventDefault();
    if (!lessonTitle || currentVocabList.length === 0) {
      alert("Please provide a lesson title and at least one vocabulary item.");
      return;
    }

    const newLesson = {
      id: `man-l-${Date.now()}`,
      title: lessonTitle,
      icon: lessonIcon,
      description: lessonDesc || `Interactive lesson on ${lessonTitle}`,
      xp: 50,
      vocabulary: currentVocabList,
      phrases: currentPhrasesList,
      quiz: currentQuizList.length > 0 ? currentQuizList : [
        {
          id: `fallback-q-${Date.now()}`,
          type: "multiple-choice",
          question: `What is the meaning of "${currentVocabList[0].german}"?`,
          options: [currentVocabList[0].english, "Book", "Hello", "Window"],
          correctAnswer: currentVocabList[0].english,
          hint: "Think back to the vocabulary cards."
        }
      ]
    };

    onAddLesson(selectedGradeId, newLesson);
    
    // Reset Form
    setLessonTitle("");
    setLessonIcon("📚");
    setLessonDesc("");
    setCurrentVocabList([]);
    setCurrentPhrasesList([]);
    setCurrentQuizList([]);
    alert("New lesson added successfully to the curriculum!");
  };

  // AI Prompt generator
  const handleAiSend = () => {
    if (!aiPrompt.trim()) return;
    const prompt = aiPrompt.trim().toLowerCase();
    
    const newChat = [...chatHistory, { sender: 'user', text: aiPrompt }];
    setChatHistory(newChat);
    setAiPrompt("");

    setTimeout(() => {
      // Look up in our simulated AI catalog
      let foundKey = null;
      if (prompt.includes("animal") || prompt.includes("tier")) foundKey = "animals";
      else if (prompt.includes("shop") || prompt.includes("store") || prompt.includes("kauf")) foundKey = "shopping";
      else if (prompt.includes("breakfast") || prompt.includes("frühstück") || prompt.includes("food") || prompt.includes("essen")) foundKey = "breakfast";
      else if (prompt.includes("music") || prompt.includes("lied") || prompt.includes("musik")) foundKey = "music";

      if (foundKey && AI_CATALOG[foundKey]) {
        const lessonData = AI_CATALOG[foundKey];
        setGeneratedLesson(lessonData);
        setChatHistory([...newChat, {
          sender: 'ai',
          text: `Awesome! I have parsed your request and generated a complete curriculum lesson: **"${lessonData.title}"**. It contains ${lessonData.vocabulary.length} custom vocabulary cards, ${lessonData.phrases.length} classroom phrases, and ${lessonData.quiz.length} quiz questions. You can preview and import this directly below!`
        }]);
      } else {
        // Dynamic Fallback generator
        const capitalizedTopic = aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1);
        const dynamicLesson = {
          title: `${capitalizedTopic} (Der ${capitalizedTopic})`,
          icon: "💡",
          description: `AI Generated lesson focusing on ${capitalizedTopic} concepts.`,
          vocabulary: [
            { german: capitalizedTopic, english: capitalizedTopic.toLowerCase(), gender: "der", example: `Das ist ein ${capitalizedTopic}.`, exampleEnglish: `That is a ${capitalizedTopic.toLowerCase()}.` },
            { german: "lernen", english: "to learn", gender: "none", example: "Wir lernen gern.", exampleEnglish: "We like to learn." }
          ],
          phrases: [
            { german: `Ich liebe ${capitalizedTopic}.`, english: `I love ${capitalizedTopic.toLowerCase()}.` }
          ],
          quiz: [
            {
              id: `ai-dyn-q1-${Date.now()}`,
              type: "multiple-choice",
              question: `What is the meaning of "${capitalizedTopic}"?`,
              options: [capitalizedTopic.toLowerCase(), "Water", "School", "Teacher"],
              correctAnswer: capitalizedTopic.toLowerCase(),
              hint: "Matches the title topic."
            }
          ]
        };

        setGeneratedLesson(dynamicLesson);
        setChatHistory([...newChat, {
          sender: 'ai',
          text: `I've generated a customized lesson for **"${capitalizedTopic}"**. I added specific core vocabulary words, grammar matches, and diagnostic tests. Review the preview and click "Import Lesson" to add it to your classroom board!`
        }]);
      }
    }, 800);
  };

  const handleImportAiLesson = () => {
    if (!generatedLesson) return;
    
    const formattedLesson = {
      id: `ai-l-${Date.now()}`,
      title: generatedLesson.title,
      icon: generatedLesson.icon || "📚",
      description: generatedLesson.description,
      xp: 50,
      vocabulary: generatedLesson.vocabulary,
      phrases: generatedLesson.phrases,
      quiz: generatedLesson.quiz
    };

    onAddLesson(selectedGradeId, formattedLesson);
    setGeneratedLesson(null);
    alert(`Imported "${formattedLesson.title}" into ${selectedGradeId === 'grade-4' ? '4th' : selectedGradeId === 'grade-5' ? '5th' : selectedGradeId === 'grade-6' ? '6th' : '7th'} Grade curriculum!`);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h2 className="font-playful">MES Admin Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage German curriculum lessons for Interactive Flat Panels</p>
        </div>
        <div className="form-group" style={{ margin: 0, flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ margin: 0 }}>Target Class:</label>
          <select 
            className="select-field" 
            value={selectedGradeId} 
            onChange={(e) => setSelectedGradeId(e.target.value)}
            style={{ padding: '0.5rem 1rem', minHeight: '40px' }}
          >
            <option value="grade-4">4th Grade</option>
            <option value="grade-5">5th Grade</option>
            <option value="grade-6">6th Grade</option>
            <option value="grade-7">7th Grade</option>
          </select>
        </div>
      </div>

      <div className="admin-layout">
        {/* Main Side: Form & Lessons list */}
        <div className="admin-main-panel">
          
          {/* Lessons List Manager */}
          <div className="admin-card">
            <h3 className="font-playful">
              📚 Current Curriculum for {curriculum[selectedGradeId]?.name}
            </h3>
            <div className="lessons-grid">
              {curriculum[selectedGradeId]?.lessons.map(lesson => (
                <div key={lesson.id} className="lesson-manage-card">
                  <div className="manage-card-meta">
                    <span className="manage-card-icon">{lesson.icon}</span>
                    <div className="manage-card-text">
                      <h4>{lesson.title}</h4>
                      <p>{lesson.vocabulary.length} Words | {lesson.quiz.length} Questions</p>
                    </div>
                  </div>
                  <div className="manage-card-actions">
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
                          onDeleteLesson(selectedGradeId, lesson.id);
                        }
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
              {curriculum[selectedGradeId]?.lessons.length === 0 && (
                <p style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0' }}>
                  No lessons in this grade. Add one below or use the AI Generator!
                </p>
              )}
            </div>
          </div>

          {/* Form to Add New Lesson */}
          <div className="admin-card">
            <h3 className="font-playful">✏ Create Custom Lesson manually</h3>
            <form onSubmit={handleSaveLesson}>
              <div className="form-row">
                <div className="form-group">
                  <label>Lesson Title (English & German description)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Am Strand - At the beach"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Icon Emoji</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="🏖"
                      value={lessonIcon}
                      onChange={(e) => setLessonIcon(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description / Subtitle</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Talk about beach items."
                      value={lessonDesc}
                      onChange={(e) => setLessonDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Sub-Builder for Vocabulary */}
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
                <h4 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.05rem' }}>Vocabulary Card List ({currentVocabList.length} added)</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="German word (e.g. Ball)" 
                    value={vocabGerman}
                    onChange={(e) => setVocabGerman(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="English meaning (e.g. ball)" 
                    value={vocabEnglish}
                    onChange={(e) => setVocabEnglish(e.target.value)}
                  />
                  <select 
                    className="select-field"
                    value={vocabGender}
                    onChange={(e) => setVocabGender(e.target.value)}
                  >
                    <option value="none">No Gender (verb/adj)</option>
                    <option value="der">der (Masc)</option>
                    <option value="die">die (Fem)</option>
                    <option value="das">das (Neut)</option>
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Example Sentence (e.g. Der Ball ist rot.)" 
                    value={vocabExample}
                    onChange={(e) => setVocabExample(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Example English (e.g. The ball is red.)" 
                    value={vocabExampleEn}
                    onChange={(e) => setVocabExampleEn(e.target.value)}
                  />
                </div>

                <button 
                  type="button" 
                  className="action-btn" 
                  style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', minHeight: '35px', background: '#fff', color: '#0f172a' }}
                  onClick={handleAddVocab}
                >
                  ➕ Add Word to Lesson
                </button>

                {currentVocabList.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {currentVocabList.map((v, i) => (
                      <span key={i} style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', fontSize: '0.85rem' }}>
                        {v.gender !== 'none' ? `${v.gender} ` : ''}{v.german} ({v.english})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Sub-Builder for Phrases */}
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
                <h4 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.05rem' }}>Common Phrases ({currentPhrasesList.length} added)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="German Phrase" 
                    value={phraseGerman}
                    onChange={(e) => setPhraseGerman(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="English translation" 
                    value={phraseEnglish}
                    onChange={(e) => setPhraseEnglish(e.target.value)}
                  />
                </div>
                <button 
                  type="button" 
                  className="action-btn" 
                  style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', minHeight: '35px', background: '#fff', color: '#0f172a' }}
                  onClick={handleAddPhrase}
                >
                  ➕ Add Phrase to Lesson
                </button>

                {currentPhrasesList.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {currentPhrasesList.map((p, i) => (
                      <span key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        💬 {p.german} = {p.english}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Sub-Builder for Quizzes */}
              <div style={{ border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.1)' }}>
                <h4 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.05rem' }}>Quiz Questions ({currentQuizList.length} added)</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Question prompt (e.g. Translate 'Ball')" 
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                  />
                  <select 
                    className="select-field"
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="fill-in-the-blank">Fill in the Blank</option>
                    <option value="sentence-builder">Sentence Builder</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Options (comma separated, e.g. ball, book, cat, bird)" 
                    value={quizOptionsStr}
                    disabled={quizType === 'sentence-builder'}
                    onChange={(e) => setQuizOptionsStr(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Correct Answer" 
                    value={quizCorrectAnswer}
                    onChange={(e) => setQuizCorrectAnswer(e.target.value)}
                  />
                </div>

                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Hint (optional)" 
                  value={quizHint}
                  onChange={(e) => setQuizHint(e.target.value)}
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                />

                <button 
                  type="button" 
                  className="action-btn" 
                  style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', minHeight: '35px', background: '#fff', color: '#0f172a' }}
                  onClick={handleAddQuiz}
                >
                  ➕ Add Question
                </button>

                {currentQuizList.length > 0 && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {currentQuizList.map((q, i) => (
                      <span key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        ❓ Q{i+1}: {q.question} (Correct: {q.correctAnswer})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="action-btn" 
                style={{ width: '100%', background: 'var(--xp-color)' }}
              >
                💾 Save Custom Lesson into Curriculum
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: AI assistant generator */}
        <div className="admin-sidebar">
          <div className="admin-card ai-assistant-box">
            <h3 className="font-playful" style={{ color: '#c084fc', borderBottomColor: 'rgba(167, 139, 250, 0.2)' }}>
              🤖 AI Lesson Assistant
            </h3>
            
            <div className="ai-chat-history">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`chat-bubble ${chat.sender}`}>
                  {chat.text}
                </div>
              ))}
            </div>

            <div className="ai-chat-input-bar">
              <input 
                type="text" 
                placeholder="Type 'animals', 'shopping', 'breakfast'..." 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
              />
              <button onClick={handleAiSend}>Generate</button>
            </div>
          </div>

          {/* AI Generator Preview Box */}
          {generatedLesson && (
            <div className="ai-preview-box">
              <div className="ai-preview-title font-playful">{generatedLesson.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {generatedLesson.description}
              </p>
              
              <div style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                <strong>Vocabularies:</strong> {generatedLesson.vocabulary.map(v => v.german).join(', ')}
              </div>

              <button 
                className="action-btn"
                style={{ width: '100%', fontSize: '1rem', minHeight: '40px', background: '#8b5cf6', color: '#fff' }}
                onClick={handleImportAiLesson}
              >
                ⚡ Import AI Lesson
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
