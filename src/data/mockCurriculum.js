export const initialCurriculum = {
  "grade-4": {
    id: "grade-4",
    name: "4th Grade",
    description: "Foundational German: Greetings, Numbers, Colors, and School Life.",
    theme: {
      primary: "#FF6B6B",
      secondary: "#FF8E53",
      accent: "#FFD066",
      gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
      glow: "rgba(255, 107, 107, 0.4)"
    },
    lessons: [
      {
        id: "g4-l1",
        title: "Hallo! - Greetings & Introductions",
        description: "Learn how to say hello, ask for someone's name, and introduce yourself in German.",
        icon: "👋",
        xp: 50,
        vocabulary: [
          { german: "Hallo", english: "Hello", gender: "none", example: "Hallo! Wie geht es dir?", exampleEnglish: "Hello! How are you?" },
          { german: "Guten Morgen", english: "Good morning", gender: "none", example: "Guten Morgen, Herr Rijo!", exampleEnglish: "Good morning, Mr. Rijo!" },
          { german: "Guten Tag", english: "Good day / Afternoon", gender: "none", example: "Guten Tag! Mein Name ist Tharakan.", exampleEnglish: "Good day! My name is Tharakan." },
          { german: "Tschüss", english: "Bye / Goodbye", gender: "none", example: "Tschüss! Bis morgen.", exampleEnglish: "Bye! See you tomorrow." },
          { german: "Auf Wiedersehen", english: "Goodbye (formal)", gender: "none", example: "Auf Wiedersehen, Klasse!", exampleEnglish: "Goodbye, class!" }
        ],
        phrases: [
          { german: "Wie heißt du?", english: "What is your name?" },
          { german: "Ich heiße...", english: "My name is..." },
          { german: "Wie geht es dir?", english: "How are you?" },
          { german: "Mir geht es gut, danke!", english: "I am doing well, thank you!" }
        ],
        quiz: [
          {
            id: "g4-l1-q1",
            type: "multiple-choice",
            question: "How do you say 'Good morning' in German?",
            options: ["Guten Tag", "Guten Morgen", "Gute Nacht", "Hallo"],
            correctAnswer: "Guten Morgen",
            hint: "Starts with 'Morgen' which means morning."
          },
          {
            id: "g4-l1-q2",
            type: "multiple-choice",
            question: "What does 'Wie heißt du?' mean?",
            options: ["How old are you?", "Where do you live?", "What is your name?", "How are you?"],
            correctAnswer: "What is your name?",
            hint: "It asks for your name ('heißen' is the verb for 'to be named')."
          },
          {
            id: "g4-l1-q3",
            type: "sentence-builder",
            question: "Arrange the words to say: 'My name is Peter.'",
            options: ["Ich", "heiße", "Peter"],
            correctAnswer: "Ich heiße Peter",
            hint: "Start with 'Ich' (I) followed by the verb 'heiße' (am named)."
          },
          {
            id: "g4-l1-q4",
            type: "fill-in-the-blank",
            question: "Fill in the missing word: 'Wie geht ___ dir?'",
            options: ["es", "ist", "du", "sie"],
            correctAnswer: "es",
            hint: "The standard phrase is 'Wie geht es dir?'."
          }
        ]
      },
      {
        id: "g4-l2",
        title: "Die Zahlen - Numbers 1 to 20",
        description: "Master counting from one to twenty and learn how to state your age.",
        icon: "🔢",
        xp: 50,
        vocabulary: [
          { german: "eins", english: "one", gender: "none", example: "Ich habe eins Buch.", exampleEnglish: "I have one book." },
          { german: "zwei", english: "two", gender: "none", example: "Zwei Katzen spielen.", exampleEnglish: "Two cats are playing." },
          { german: "drei", english: "three", gender: "none", example: "Drei Kinder lachen.", exampleEnglish: "Three kids are laughing." },
          { german: "vier", english: "four", gender: "none", example: "Vier Stühle im Klassenzimmer.", exampleEnglish: "Four chairs in the classroom." },
          { german: "fünf", english: "five", gender: "none", example: "Fünf Finger an einer Hand.", exampleEnglish: "Five fingers on one hand." },
          { german: "zehn", english: "ten", gender: "none", example: "Zehn Stifte.", exampleEnglish: "Ten pens." },
          { german: "zwanzig", english: "twenty", gender: "none", example: "Ich bin zwanzig Jahre alt.", exampleEnglish: "I am twenty years old." }
        ],
        phrases: [
          { german: "Wie alt bist du?", english: "How old are you?" },
          { german: "Ich bin zehn Jahre alt.", english: "I am ten years old." },
          { german: "Wie viel macht das?", english: "How much does that make / How much is it?" }
        ],
        quiz: [
          {
            id: "g4-l2-q1",
            type: "multiple-choice",
            question: "Which German word represents the number 5?",
            options: ["vier", "fünf", "drei", "sechs"],
            correctAnswer: "fünf",
            hint: "Spelt with an umlaut (ü)."
          },
          {
            id: "g4-l2-q2",
            type: "multiple-choice",
            question: "What is 'zwanzig' in English?",
            options: ["Ten", "Twelve", "Twenty", "Two"],
            correctAnswer: "Twenty",
            hint: "It's the highest number in this lesson."
          },
          {
            id: "g4-l2-q3",
            type: "sentence-builder",
            question: "Arrange the words to say: 'I am ten years old.'",
            options: ["Ich", "bin", "zehn", "Jahre", "alt"],
            correctAnswer: "Ich bin zehn Jahre alt",
            hint: "Start with 'Ich bin' then the number, then 'Jahre alt'."
          }
        ]
      },
      {
        id: "g4-l3",
        title: "Die Farben - Colors",
        description: "Brighten your German vocabulary with primary and secondary colors.",
        icon: "🎨",
        xp: 50,
        vocabulary: [
          { german: "rot", english: "red", gender: "none", example: "Der Apfel ist rot.", exampleEnglish: "The apple is red." },
          { german: "blau", english: "blue", gender: "none", example: "Der Himmel ist blau.", exampleEnglish: "The sky is blue." },
          { german: "grün", english: "green", gender: "none", example: "Das Gras ist grün.", exampleEnglish: "The grass is green." },
          { german: "gelb", english: "yellow", gender: "none", example: "Die Sonne ist gelb.", exampleEnglish: "The sun is yellow." },
          { german: "schwarz", english: "black", gender: "none", example: "Die Katze ist schwarz.", exampleEnglish: "The cat is black." },
          { german: "weiß", english: "white", gender: "none", example: "Das Papier ist weiß.", exampleEnglish: "The paper is white." }
        ],
        phrases: [
          { german: "Was ist deine Lieblingsfarbe?", english: "What is your favorite color?" },
          { german: "Meine Lieblingsfarbe ist Blau.", english: "My favorite color is blue." },
          { german: "Das ist sehr bunt!", english: "That is very colorful!" }
        ],
        quiz: [
          {
            id: "g4-l3-q1",
            type: "multiple-choice",
            question: "What color is 'grün'?",
            options: ["Green", "Gray", "Yellow", "Red"],
            correctAnswer: "Green",
            hint: "Sounds very similar to English green."
          },
          {
            id: "g4-l3-q2",
            type: "multiple-choice",
            question: "Translate: 'The sun is yellow.'",
            options: ["Die Sonne ist rot.", "Die Sonne ist gelb.", "Die Sonne ist blau.", "Die Sonne ist grün."],
            correctAnswer: "Die Sonne ist gelb.",
            hint: "Yellow is 'gelb' in German."
          },
          {
            id: "g4-l3-q3",
            type: "sentence-builder",
            question: "Arrange to say: 'My favorite color is red.'",
            options: ["Meine", "Lieblingsfarbe", "ist", "rot"],
            correctAnswer: "Meine Lieblingsfarbe ist rot",
            hint: "Start with 'Meine' then compound word 'Lieblingsfarbe'."
          }
        ]
      },
      {
        id: "g4-l4",
        title: "In der Schule - Classroom Objects",
        description: "Learn the articles (der/die/das) for items in your school bag.",
        icon: "🎒",
        xp: 60,
        vocabulary: [
          { german: "Buch", english: "book", gender: "das", example: "Das Buch ist dick.", exampleEnglish: "The book is thick." },
          { german: "Stift", english: "pen / pencil", gender: "der", example: "Der Stift schreibt gut.", exampleEnglish: "The pen writes well." },
          { german: "Schere", english: "scissors", gender: "die", example: "Die Schere ist scharf.", exampleEnglish: "The scissors are sharp." },
          { german: "Tisch", english: "table / desk", gender: "der", example: "Das Heft liegt auf dem Tisch.", exampleEnglish: "The notebook lies on the table." },
          { german: "Klassenzimmer", english: "classroom", gender: "das", example: "Unser Klassenzimmer ist groß.", exampleEnglish: "Our classroom is big." }
        ],
        phrases: [
          { german: "Wo ist meine Schere?", english: "Where are my scissors?" },
          { german: "Hast du einen Stift?", english: "Do you have a pen?" },
          { german: "Das ist ein Buch.", english: "That is a book." }
        ],
        quiz: [
          {
            id: "g4-l4-q1",
            type: "multiple-choice",
            question: "What is the correct German article for 'Buch' (book)?",
            options: ["der", "die", "das"],
            correctAnswer: "das",
            hint: "Books are neutral gender in German."
          },
          {
            id: "g4-l4-q2",
            type: "multiple-choice",
            question: "What does 'der Stift' mean?",
            options: ["The scissors", "The book", "The pen/pencil", "The desk"],
            correctAnswer: "The pen/pencil",
            hint: "You use it to write."
          },
          {
            id: "g4-l4-q3",
            type: "sentence-builder",
            question: "Arrange to say: 'Where is my scissors?'",
            options: ["Wo", "ist", "meine", "Schere?"],
            correctAnswer: "Wo ist meine Schere?",
            hint: "Start with question word 'Wo' followed by the verb."
          }
        ]
      }
    ]
  },
  "grade-5": {
    id: "grade-5",
    name: "5th Grade",
    description: "Elementary German: Family, Hobbies, Calendar, and Food/Drinks.",
    theme: {
      primary: "#4ECDC4",
      secondary: "#2AB8B0",
      accent: "#FFD066",
      gradient: "linear-gradient(135deg, #4ECDC4 0%, #2AB8B0 100%)",
      glow: "rgba(78, 205, 196, 0.4)"
    },
    lessons: [
      {
        id: "g5-l1",
        title: "Meine Familie - My Family",
        description: "Introduce your family members and describe relationships in German.",
        icon: "👨‍👩‍👧‍👦",
        xp: 50,
        vocabulary: [
          { german: "Mutter", english: "mother", gender: "die", example: "Meine Mutter kocht gern.", exampleEnglish: "My mother likes to cook." },
          { german: "Vater", english: "father", gender: "der", example: "Mein Vater liest ein Buch.", exampleEnglish: "My father is reading a book." },
          { german: "Bruder", english: "brother", gender: "der", example: "Ich habe einen Bruder.", exampleEnglish: "I have a brother." },
          { german: "Schwester", english: "sister", gender: "die", example: "Meine Schwester singt.", exampleEnglish: "My sister sings." },
          { german: "Eltern", english: "parents", gender: "plural", example: "Meine Eltern sind lieb.", exampleEnglish: "My parents are sweet." }
        ],
        phrases: [
          { german: "Hast du Geschwister?", english: "Do you have siblings?" },
          { german: "Ich liebe meine Familie.", english: "I love my family." },
          { german: "Wie alt ist dein Bruder?", english: "How old is your brother?" }
        ],
        quiz: [
          {
            id: "g5-l1-q1",
            type: "multiple-choice",
            question: "How do you say 'father' in German?",
            options: ["die Mutter", "der Vater", "der Bruder", "die Schwester"],
            correctAnswer: "der Vater",
            hint: "It starts with V but sounds like F."
          },
          {
            id: "g5-l1-q2",
            type: "multiple-choice",
            question: "What does 'die Schwester' translate to?",
            options: ["The brother", "The sister", "The mother", "The grandmother"],
            correctAnswer: "The sister",
            hint: "Similar to the English word."
          },
          {
            id: "g5-l1-q3",
            type: "sentence-builder",
            question: "Arrange to say: 'I have a brother.'",
            options: ["Ich", "habe", "einen", "Bruder."],
            correctAnswer: "Ich habe einen Bruder.",
            hint: "Because 'Bruder' is masculine accusative, we say 'einen'."
          }
        ]
      },
      {
        id: "g5-l2",
        title: "Meine Hobbys - Hobbies & Activities",
        description: "Express your interests and what you like to do in your free time.",
        icon: "⚽",
        xp: 50,
        vocabulary: [
          { german: "spielen", english: "to play", gender: "none", example: "Wir spielen Fußball.", exampleEnglish: "We play football." },
          { german: "lesen", english: "to read", gender: "none", example: "Ich lese ein Buch gern.", exampleEnglish: "I like reading a book." },
          { german: "schwimmen", english: "to swim", gender: "none", example: "Er schwimmt im Pool.", exampleEnglish: "He swims in the pool." },
          { german: "singen", english: "to sing", gender: "none", example: "Sie singt sehr gut.", exampleEnglish: "She sings very well." },
          { german: "tanzen", english: "to dance", gender: "none", example: "Tanzt du gern?", exampleEnglish: "Do you like dancing?" }
        ],
        phrases: [
          { german: "Was machst du in deiner Freizeit?", english: "What do you do in your free time?" },
          { german: "Ich spiele gern Fußball.", english: "I like playing football." },
          { german: "Liest du gern?", english: "Do you like reading?" }
        ],
        quiz: [
          {
            id: "g5-l2-q1",
            type: "multiple-choice",
            question: "What does the verb 'schwimmen' mean?",
            options: ["To dance", "To sing", "To swim", "To play"],
            correctAnswer: "To swim",
            hint: "Sounds almost identical to English."
          },
          {
            id: "g5-l2-q2",
            type: "multiple-choice",
            question: "Translate: 'I like playing football.'",
            options: ["Ich singe gern.", "Ich tanze gern.", "Ich spiele gern Fußball.", "Ich lese gern."],
            correctAnswer: "Ich spiele gern Fußball.",
            hint: "Football in German is 'Fußball' and like playing is 'spiele gern'."
          },
          {
            id: "g5-l2-q3",
            type: "sentence-builder",
            question: "Arrange to say: 'Do you like dancing?' (literally: Dance you gladly?)",
            options: ["Tanzt", "du", "gern?"],
            correctAnswer: "Tanzt du gern?",
            hint: "Start with verb 'Tanzt' for a yes/no question."
          }
        ]
      },
      {
        id: "g5-l3",
        title: "Die Wochentage - Calendar & Days",
        description: "Learn the seven days of the week, months, and planning schedules.",
        icon: "📅",
        xp: 50,
        vocabulary: [
          { german: "Montag", english: "Monday", gender: "der", example: "Am Montag gehe ich zur Schule.", exampleEnglish: "On Monday I go to school." },
          { german: "Freitag", english: "Friday", gender: "der", example: "Freitag ist mein Lieblingstag.", exampleEnglish: "Friday is my favorite day." },
          { german: "Samstag", english: "Saturday", gender: "der", example: "Am Samstag spielen wir.", exampleEnglish: "On Saturday we play." },
          { german: "Sonntag", english: "Sunday", gender: "der", example: "Sonntag ist Ruhetag.", exampleEnglish: "Sunday is rest day." },
          { german: "Woche", english: "week", gender: "die", example: "Die Woche hat sieben Tage.", exampleEnglish: "The week has seven days." }
        ],
        phrases: [
          { german: "Welcher Tag ist heute?", english: "Which day is today?" },
          { german: "Heute ist Montag.", english: "Today is Monday." },
          { german: "Am Wochenende lernen wir nicht.", english: "On the weekend we don't study." }
        ],
        quiz: [
          {
            id: "g5-l3-q1",
            type: "multiple-choice",
            question: "Which day is 'Freitag'?",
            options: ["Monday", "Wednesday", "Friday", "Sunday"],
            correctAnswer: "Friday",
            hint: "Think of 'Frei' (free) day - start of the weekend!"
          },
          {
            id: "g5-l3-q2",
            type: "multiple-choice",
            question: "How do you say 'Today is Monday' in German?",
            options: ["Heute ist Sonntag.", "Heute ist Montag.", "Morgen ist Montag.", "Gestern war Montag."],
            correctAnswer: "Heute ist Montag.",
            hint: "Today is 'Heute' and Monday is 'Montag'."
          }
        ]
      },
      {
        id: "g5-l4",
        title: "Essen und Trinken - Food & Drinks",
        description: "Express hunger and thirst, and order basic items in German.",
        icon: "🍎",
        xp: 60,
        vocabulary: [
          { german: "Apfel", english: "apple", gender: "der", example: "Ich esse einen Apfel.", exampleEnglish: "I am eating an apple." },
          { german: "Brot", english: "bread", gender: "das", example: "Das Brot schmeckt lecker.", exampleEnglish: "The bread tastes delicious." },
          { german: "Wasser", english: "water", gender: "das", example: "Ein Glas Wasser, bitte.", exampleEnglish: "A glass of water, please." },
          { german: "Milch", english: "milk", gender: "die", example: "Die Milch ist kalt.", exampleEnglish: "The milk is cold." },
          { german: "Käse", english: "cheese", gender: "der", example: "Ich mag Käse.", exampleEnglish: "I like cheese." }
        ],
        phrases: [
          { german: "Ich habe Hunger.", english: "I am hungry. (literally: I have hunger)" },
          { german: "Ich habe Durst.", english: "I am thirsty. (literally: I have thirst)" },
          { german: "Guten Appetit!", english: "Enjoy your meal!" }
        ],
        quiz: [
          {
            id: "g5-l4-q1",
            type: "multiple-choice",
            question: "What does 'Ich habe Durst' mean?",
            options: ["I am hungry", "I am cold", "I am tired", "I am thirsty"],
            correctAnswer: "I am thirsty",
            hint: "Durst is related to thirst."
          },
          {
            id: "g5-l4-q2",
            type: "multiple-choice",
            question: "What is the article of 'Wasser'?",
            options: ["der", "die", "das"],
            correctAnswer: "das",
            hint: "Water is neutral gender."
          },
          {
            id: "g5-l4-q3",
            type: "sentence-builder",
            question: "Arrange to say: 'Enjoy your meal!'",
            options: ["Guten", "Appetit!"],
            correctAnswer: "Guten Appetit!",
            hint: "Just two words!"
          }
        ]
      }
    ]
  },
  "grade-6": {
    id: "grade-6",
    name: "6th Grade",
    description: "Intermediate German: Clock/Time, Daily Routines, Housing, and Weather.",
    theme: {
      primary: "#9B5DE5",
      secondary: "#7B2CBF",
      accent: "#F15BB5",
      gradient: "linear-gradient(135deg, #9B5DE5 0%, #7B2CBF 100%)",
      glow: "rgba(155, 93, 229, 0.4)"
    },
    lessons: [
      {
        id: "g6-l1",
        title: "Wie spät ist es? - Telling Time",
        description: "Ask and tell the time in German, both formally and informally.",
        icon: "⏰",
        xp: 55,
        vocabulary: [
          { german: "Uhr", english: "o'clock / watch", gender: "die", example: "Es ist zwei Uhr.", exampleEnglish: "It is two o'clock." },
          { german: "Viertel", english: "quarter", gender: "das", example: "Es ist Viertel nach drei.", exampleEnglish: "It is quarter past three." },
          { german: "halb", english: "half", gender: "none", example: "Es ist halb fünf.", exampleEnglish: "It is half past four. (literally: half five)" },
          { german: "Minute", english: "minute", gender: "die", example: "Fünf Minuten.", exampleEnglish: "Five minutes." }
        ],
        phrases: [
          { german: "Wie spät ist es?", english: "What time is it?" },
          { german: "Wie viel Uhr ist es?", english: "What time is it? (alternative)" },
          { german: "Es ist halb zwei.", english: "It is half past one. (Note: in German, half-two refers to half an hour BEFORE two!)" }
        ],
        quiz: [
          {
            id: "g6-l1-q1",
            type: "multiple-choice",
            question: "What is the meaning of 'Wie spät ist es?'",
            options: ["How old is it?", "How late is it? / What time is it?", "Where is the clock?", "Who is it?"],
            correctAnswer: "How late is it? / What time is it?",
            hint: "Spät means late."
          },
          {
            id: "g6-l1-q2",
            type: "multiple-choice",
            question: "If it's 4:30, what do Germans say?",
            options: ["Es ist halb vier.", "Es ist halb fünf.", "Es ist vier Uhr.", "Es ist fünf Uhr."],
            correctAnswer: "Es ist halb fünf.",
            hint: "Germans say 'half way to the next hour'."
          }
        ]
      },
      {
        id: "g6-l2",
        title: "Mein Tag - Daily Routine",
        description: "Talk about your daily activities and practice separable verbs like aufstehen.",
        icon: "🌅",
        xp: 60,
        vocabulary: [
          { german: "aufstehen", english: "to stand up / get up", gender: "none", example: "Ich stehe um sechs Uhr auf.", exampleEnglish: "I get up at six o'clock." },
          { german: "frühstücken", english: "to eat breakfast", gender: "none", example: "Ich frühstücke Brot mit Käse.", exampleEnglish: "I eat bread with cheese for breakfast." },
          { german: "lernen", english: "to learn / study", gender: "none", example: "In der Schule lernen wir Deutsch.", exampleEnglish: "In school we study German." },
          { german: "schlafen", english: "to sleep", gender: "none", example: "Ich schlafe um zehn Uhr.", exampleEnglish: "I sleep at ten o'clock." }
        ],
        phrases: [
          { german: "Wann stehst du auf?", english: "When do you get up?" },
          { german: "Ich gehe ins Bett.", english: "I am going to bed." },
          { german: "Ich mache meine Hausaufgaben.", english: "I am doing my homework." }
        ],
        quiz: [
          {
            id: "g6-l2-q1",
            type: "multiple-choice",
            question: "What is 'breakfast' as a verb in German?",
            options: ["lernen", "schlafen", "frühstücken", "aufstehen"],
            correctAnswer: "frühstücken",
            hint: "Sounds like 'Frühstück' (breakfast noun)."
          },
          {
            id: "g6-l2-q2",
            type: "sentence-builder",
            question: "Arrange 'I get up at six o'clock' (separable verb auf-stehen):",
            options: ["Ich", "stehe", "um", "sechs", "Uhr", "auf."],
            correctAnswer: "Ich stehe um sechs Uhr auf.",
            hint: "The prefix 'auf' goes to the absolute end of the sentence."
          }
        ]
      },
      {
        id: "g6-l3",
        title: "Mein Zuhause - Inside the House",
        description: "Name different rooms of your house and simple furniture items.",
        icon: "🏠",
        xp: 55,
        vocabulary: [
          { german: "Haus", english: "house", gender: "das", example: "Unser Haus ist schön.", exampleEnglish: "Our house is beautiful." },
          { german: "Zimmer", english: "room", gender: "das", example: "Mein Zimmer ist gemütlich.", exampleEnglish: "My room is cozy." },
          { german: "Küche", english: "kitchen", gender: "die", example: "Die Küche ist sauber.", exampleEnglish: "The kitchen is clean." },
          { german: "Wohnzimmer", english: "living room", gender: "das", example: "Wir schauen Fernsehen im Wohnzimmer.", exampleEnglish: "We watch TV in the living room." },
          { german: "Bett", english: "bed", gender: "das", example: "Das Bett ist weich.", exampleEnglish: "The bed is soft." }
        ],
        phrases: [
          { german: "Willkommen in meinem Haus!", english: "Welcome to my house!" },
          { german: "Wo ist die Küche?", english: "Where is the kitchen?" }
        ],
        quiz: [
          {
            id: "g6-l3-q1",
            type: "multiple-choice",
            question: "What is 'kitchen' in German?",
            options: ["das Wohnzimmer", "die Küche", "das Haus", "das Zimmer"],
            correctAnswer: "die Küche",
            hint: "It has a feminine article 'die'."
          }
        ]
      },
      {
        id: "g6-l4",
        title: "Das Wetter - The Weather",
        description: "Describe daily weather conditions and seasons in German.",
        icon: "🌦️",
        xp: 55,
        vocabulary: [
          { german: "Sonne", english: "sun", gender: "die", example: "Die Sonne scheint.", exampleEnglish: "The sun is shining." },
          { german: "Regen", english: "rain", gender: "der", example: "Der Regen klopft ans Fenster.", exampleEnglish: "The rain knocks on the window." },
          { german: "Wind", english: "wind", gender: "der", example: "Der Wind bläst stark.", exampleEnglish: "The wind blows hard." },
          { german: "Schnee", english: "snow", gender: "der", example: "Schnee ist weiß.", exampleEnglish: "Snow is white." }
        ],
        phrases: [
          { german: "Wie ist das Wetter heute?", english: "How is the weather today?" },
          { german: "Es ist kalt.", english: "It is cold." },
          { german: "Es regnet.", english: "It is raining." },
          { german: "Die Sonne scheint.", english: "The sun is shining." }
        ],
        quiz: [
          {
            id: "g6-l4-q1",
            type: "multiple-choice",
            question: "Translate: 'It is raining.'",
            options: ["Es regnet.", "Es ist kalt.", "Die Sonne scheint.", "Es schneit."],
            correctAnswer: "Es regnet.",
            hint: "Regnet is related to Regen (rain)."
          },
          {
            id: "g6-l4-q2",
            type: "multiple-choice",
            question: "How do you ask 'How is the weather today?'",
            options: ["Wie spät ist es?", "Wie ist das Wetter heute?", "Was machst du heute?", "Wer ist das?"],
            correctAnswer: "Wie ist das Wetter heute?",
            hint: "Weather is 'Wetter'."
          }
        ]
      }
    ]
  },
  "grade-7": {
    id: "grade-7",
    name: "7th Grade",
    description: "Advanced Elementary: Clothing, Transport/Directions, Sports, and Modals.",
    theme: {
      primary: "#FFB703",
      secondary: "#FB8500",
      accent: "#219EBC",
      gradient: "linear-gradient(135deg, #FFB703 0%, #FB8500 100%)",
      glow: "rgba(251, 133, 0, 0.4)"
    },
    lessons: [
      {
        id: "g7-l1",
        title: "Meine Kleidung - Clothing & Accusative",
        description: "Name clothing items and learn how German masculine articles change to 'einen' in direct objects.",
        icon: "👕",
        xp: 60,
        vocabulary: [
          { german: "Mantel", english: "coat / overcoat", gender: "der", example: "Ich trage einen Mantel.", exampleEnglish: "I am wearing a coat." },
          { german: "Hose", english: "trousers / pants", gender: "die", example: "Die Hose ist blau.", exampleEnglish: "The pants are blue." },
          { german: "Hemd", english: "shirt", gender: "das", example: "Das Hemd ist neu.", exampleEnglish: "The shirt is new." },
          { german: "Schuh", english: "shoe", gender: "der", example: "Ich kaufe einen Schuh.", exampleEnglish: "I am buying a shoe." },
          { german: "Jacke", english: "jacket", gender: "die", example: "Ich mag meine rote Jacke.", exampleEnglish: "I like my red jacket." }
        ],
        phrases: [
          { german: "Was trägst du heute?", english: "What are you wearing today?" },
          { german: "Ich trage ein T-Shirt.", english: "I am wearing a T-shirt." },
          { german: "Das steht dir gut!", english: "That looks good on you!" }
        ],
        quiz: [
          {
            id: "g7-l1-q1",
            type: "multiple-choice",
            question: "Under the Accusative case, what does 'der Mantel' change to in: 'Ich trage ___ Mantel'?",
            options: ["ein", "einen", "eine", "das"],
            correctAnswer: "einen",
            hint: "Masculine objects change from 'der/ein' to 'den/einen'."
          },
          {
            id: "g7-l1-q2",
            type: "multiple-choice",
            question: "What is 'Hose' in English?",
            options: ["Shirt", "Coat", "Shoes", "Trousers/Pants"],
            correctAnswer: "Trousers/Pants",
            hint: "A leg-covering clothing item."
          },
          {
            id: "g7-l1-q3",
            type: "sentence-builder",
            question: "Arrange: 'I am wearing a coat.'",
            options: ["Ich", "trage", "einen", "Mantel."],
            correctAnswer: "Ich trage einen Mantel.",
            hint: "Start with subject, then verb 'trage', then accusative masculine 'einen Mantel'."
          }
        ]
      },
      {
        id: "g7-l2",
        title: "Unterwegs - Transport & Directions",
        description: "Learn how to ask for directions and describe travel via train, car, or bus.",
        icon: "🚇",
        xp: 60,
        vocabulary: [
          { german: "Zug", english: "train", gender: "der", example: "Der Zug kommt pünktlich.", exampleEnglish: "The train arrives on time." },
          { german: "Auto", english: "car", gender: "das", example: "Das Auto fährt schnell.", exampleEnglish: "The car drives fast." },
          { german: "Fahrrad", english: "bicycle", gender: "das", example: "Ich fahre Fahrrad.", exampleEnglish: "I ride a bicycle." },
          { german: "Bahnhof", english: "train station", gender: "der", example: "Wo ist der Bahnhof?", exampleEnglish: "Where is the train station?" },
          { german: "Straße", english: "street / road", gender: "die", example: "Die Straße ist breit.", exampleEnglish: "The street is wide." }
        ],
        phrases: [
          { german: "Entschuldigung, wo ist der Bahnhof?", english: "Excuse me, where is the train station?" },
          { german: "Gehen Sie geradeaus.", english: "Go straight ahead." },
          { german: "Biegen Sie links ab.", english: "Turn left." }
        ],
        quiz: [
          {
            id: "g7-l2-q1",
            type: "multiple-choice",
            question: "What is the German word for 'train station'?",
            options: ["der Bahnhof", "der Zug", "die Straße", "das Auto"],
            correctAnswer: "der Bahnhof",
            hint: "Literally 'train yard/court'."
          },
          {
            id: "g7-l2-q2",
            type: "multiple-choice",
            question: "What does 'links abbiegen' mean?",
            options: ["Go straight", "Turn right", "Turn left", "Stop"],
            correctAnswer: "Turn left",
            hint: "Links is left in German."
          }
        ]
      },
      {
        id: "g7-l3",
        title: "Sport und Gesundheit - Healthy Living",
        description: "Discuss physical fitness, common sports, and expressing how you feel physically.",
        icon: "🏃",
        xp: 55,
        vocabulary: [
          { german: "Gesundheit", english: "health", gender: "die", example: "Gesundheit ist wichtig.", exampleEnglish: "Health is important." },
          { german: "laufen", english: "to run / walk", gender: "none", example: "Ich laufe im Park.", exampleEnglish: "I run in the park." },
          { german: "Körper", english: "body", gender: "der", example: "Mein Körper fühlt sich fit.", exampleEnglish: "My body feels fit." },
          { german: "Sport machen", english: "to do sports", gender: "none", example: "Wir machen jeden Tag Sport.", exampleEnglish: "We do sports every day." }
        ],
        phrases: [
          { german: "Ich treibe gern Sport.", english: "I like to do sports." },
          { german: "Mir tut der Kopf weh.", english: "My head hurts / I have a headache." },
          { german: "Ich fühle mich gut.", english: "I feel good." }
        ],
        quiz: [
          {
            id: "g7-l3-q1",
            type: "multiple-choice",
            question: "What does 'Gesundheit' translate to?",
            options: ["Body", "Sickness", "Health", "Running"],
            correctAnswer: "Health",
            hint: "Also said when someone sneezes!"
          }
        ]
      },
      {
        id: "g7-l4",
        title: "Modalverben - Grammatical Modals",
        description: "Master expressing ability (können), necessity (müssen), and desire (wollen).",
        icon: "🗣️",
        xp: 65,
        vocabulary: [
          { german: "können", english: "can / to be able to", gender: "none", example: "Ich kann Deutsch sprechen.", exampleEnglish: "I can speak German." },
          { german: "müssen", english: "must / to have to", gender: "none", example: "Ich muss meine Hausaufgaben machen.", exampleEnglish: "I must do my homework." },
          { german: "wollen", english: "want / to want to", gender: "none", example: "Wir wollen ein Eis essen.", exampleEnglish: "We want to eat ice cream." },
          { german: "möchten", english: "would like to", gender: "none", example: "Ich möchte ein Glas Wasser.", exampleEnglish: "I would like a glass of water." }
        ],
        phrases: [
          { german: "Kannst du mir helfen?", english: "Can you help me?" },
          { german: "Ich muss jetzt gehen.", english: "I have to go now." },
          { german: "Was willst du machen?", english: "What do you want to do?" }
        ],
        quiz: [
          {
            id: "g7-l4-q1",
            type: "multiple-choice",
            question: "Which verb means 'would like to'?",
            options: ["wollen", "müssen", "können", "möchten"],
            correctAnswer: "möchten",
            hint: "Very polite way to order food or express desire."
          },
          {
            id: "g7-l4-q2",
            type: "multiple-choice",
            question: "Translate: 'Ich kann Deutsch sprechen.'",
            options: ["I must study German.", "I can speak German.", "I want to speak German.", "I like German."],
            correctAnswer: "I can speak German.",
            hint: "Können matches can/ability."
          },
          {
            id: "g7-l4-q3",
            type: "sentence-builder",
            question: "Arrange: 'I must go now.'",
            options: ["Ich", "muss", "jetzt", "gehen."],
            correctAnswer: "Ich muss jetzt gehen.",
            hint: "Subject + Modal 'muss' + Time 'jetzt' + main verb infinitive 'gehen' at the end."
          }
        ]
      }
    ]
  }
};
