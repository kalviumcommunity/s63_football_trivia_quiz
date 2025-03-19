// Football Trivia Quiz Question Database
// Contains a large pool of questions from which a random subset will be selected for each game

const questionData = [
  // World Cup Questions
  {
    question: "Who won the FIFA World Cup in 2022?",
    options: ["Brazil", "Argentina", "France", "Germany"],
    correctAnswer: "Argentina",
  },
  {
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Brazil", "Italy", "Argentina"],
    correctAnswer: "Brazil",
  },
  {
    question: "Which player scored the 'Hand of God' goal?",
    options: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldo"],
    correctAnswer: "Diego Maradona",
  },
  {
    question: "Who is the all-time top scorer in the FIFA World Cup?",
    options: ["Miroslav Klose", "Ronaldo", "Gerd Müller", "Just Fontaine"],
    correctAnswer: "Miroslav Klose",
  },
  {
    question: "Which country hosted the 2018 FIFA World Cup?",
    options: ["Brazil", "Germany", "Russia", "South Africa"],
    correctAnswer: "Russia",
  },
  {
    question: "In what year was the first FIFA World Cup held?",
    options: ["1926", "1930", "1934", "1938"],
    correctAnswer: "1930",
  },
  {
    question: "Which country won the first FIFA World Cup?",
    options: ["Brazil", "Italy", "Uruguay", "Argentina"],
    correctAnswer: "Uruguay",
  },
  {
    question: "How many times has France won the World Cup?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    question: "Which player has appeared in the most World Cup tournaments?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Antonio Carbajal", "Lothar Matthäus"],
    correctAnswer: "Antonio Carbajal",
  },
  {
    question: "Which team lost three World Cup finals without ever winning the tournament?",
    options: ["Hungary", "Netherlands", "Croatia", "England"],
    correctAnswer: "Netherlands",
  },
  
  // Player Awards and Records
  {
    question: "Which player has the most Ballon d'Or awards?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Who is known as 'The Egyptian King'?",
    options: ["Mohamed Salah", "Sadio Mané", "Riyad Mahrez", "Pierre-Emerick Aubameyang"],
    correctAnswer: "Mohamed Salah",
  },
  {
    question: "Which player has won the most Premier League titles?",
    options: ["Ryan Giggs", "Paul Scholes", "John Terry", "Sergio Agüero"],
    correctAnswer: "Ryan Giggs",
  },
  {
    question: "Who is the all-time top scorer in the UEFA Champions League?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Raúl"],
    correctAnswer: "Cristiano Ronaldo",
  },
  {
    question: "Which player scored the fastest hat-trick in Premier League history?",
    options: ["Sadio Mané", "Sergio Agüero", "Robbie Fowler", "Alan Shearer"],
    correctAnswer: "Sadio Mané",
  },
  {
    question: "Who is the youngest player to score in a World Cup final?",
    options: ["Pelé", "Kylian Mbappé", "Gerd Müller", "Ronaldo"],
    correctAnswer: "Pelé",
  },
  {
    question: "Which player has the most assists in Premier League history?",
    options: ["Ryan Giggs", "Cesc Fàbregas", "Frank Lampard", "Kevin De Bruyne"],
    correctAnswer: "Ryan Giggs",
  },
  {
    question: "Who was the first player to win the UEFA Champions League with three different clubs?",
    options: ["Cristiano Ronaldo", "Clarence Seedorf", "Zlatan Ibrahimović", "Samuel Eto'o"],
    correctAnswer: "Clarence Seedorf",
  },
  {
    question: "Which player has scored in the most consecutive Premier League games?",
    options: ["Alan Shearer", "Ruud van Nistelrooy", "Jamie Vardy", "Thierry Henry"],
    correctAnswer: "Jamie Vardy",
  },
  {
    question: "Who is the oldest player to score in the Premier League?",
    options: ["Ryan Giggs", "Teddy Sheringham", "Kevin Phillips", "Jermain Defoe"],
    correctAnswer: "Teddy Sheringham",
  },
  
  // Club Football
  {
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["Barcelona", "Bayern Munich", "Real Madrid", "Liverpool"],
    correctAnswer: "Real Madrid",
  },
  {
    question: "Which team won the first Premier League title?",
    options: ["Manchester United", "Arsenal", "Liverpool", "Chelsea"],
    correctAnswer: "Manchester United",
  },
  {
    question: "Which club has won the most Premier League titles?",
    options: ["Manchester United", "Liverpool", "Chelsea", "Manchester City"],
    correctAnswer: "Manchester United",
  },
  {
    question: "Which Italian club has the nickname 'The Old Lady'?",
    options: ["AC Milan", "Inter Milan", "Juventus", "AS Roma"],
    correctAnswer: "Juventus",
  },
  {
    question: "Which club did Pep Guardiola manage before joining Manchester City?",
    options: ["Barcelona", "Bayern Munich", "Juventus", "Paris Saint-Germain"],
    correctAnswer: "Bayern Munich",
  },
  {
    question: "Which club has won the most FA Cup titles?",
    options: ["Manchester United", "Arsenal", "Liverpool", "Chelsea"],
    correctAnswer: "Arsenal",
  },
  {
    question: "Which club has never been relegated from the Premier League since its formation in 1992?",
    options: ["Arsenal", "Liverpool", "Manchester United", "Tottenham Hotspur"],
    correctAnswer: "Arsenal",
  },
  {
    question: "Which club has the nickname 'The Red Devils'?",
    options: ["Liverpool", "Manchester United", "Arsenal", "AC Milan"],
    correctAnswer: "Manchester United",
  },
  {
    question: "Which club did Lionel Messi join after leaving Barcelona in 2021?",
    options: ["Manchester City", "Paris Saint-Germain", "Bayern Munich", "Juventus"],
    correctAnswer: "Paris Saint-Germain",
  },
  {
    question: "Which club has won the most La Liga titles?",
    options: ["Barcelona", "Real Madrid", "Atlético Madrid", "Valencia"],
    correctAnswer: "Real Madrid",
  },
  
  // Funny/Unusual Football Facts
  {
    question: "Which player famously bit opponents on three separate occasions?",
    options: ["Diego Costa", "Luis Suárez", "Sergio Ramos", "Pepe"],
    correctAnswer: "Luis Suárez",
  },
  {
    question: "Which goalkeeper once ate a hamburger thrown onto the pitch during a match?",
    options: ["Wayne Shaw", "Jorge Campos", "René Higuita", "Jimmy Bullard"],
    correctAnswer: "Wayne Shaw",
  },
  {
    question: "Which player celebrated a goal by taking a selfie with fans?",
    options: ["Mario Balotelli", "Francesco Totti", "Cristiano Ronaldo", "Neymar"],
    correctAnswer: "Francesco Totti",
  },
  {
    question: "Which player was sent off for celebrating his goal by pulling his shirt over his head?",
    options: ["Thierry Henry", "Temuri Ketsbaia", "Paolo Di Canio", "Fabrizio Ravanelli"],
    correctAnswer: "Temuri Ketsbaia",
  },
  {
    question: "Which player accidentally broke the World Cup trophy while celebrating?",
    options: ["Sergio Ramos", "Diego Maradona", "Ronaldo", "Fabio Cannavaro"],
    correctAnswer: "Sergio Ramos",
  },
  {
    question: "Which player once celebrated a goal by pretending to be a dog?",
    options: ["Finidi George", "Robbie Fowler", "Peter Crouch", "Emmanuel Adebayor"],
    correctAnswer: "Finidi George",
  },
  {
    question: "Which player was famous for his 'robot' goal celebration?",
    options: ["Peter Crouch", "Daniel Sturridge", "Jermain Defoe", "Emile Heskey"],
    correctAnswer: "Peter Crouch",
  },
  {
    question: "Which player celebrated a goal by sitting in a chair?",
    options: ["Roger Milla", "Bebeto", "Jurgen Klinsmann", "Robbie Keane"],
    correctAnswer: "Roger Milla",
  },
  {
    question: "Which player was known for celebrating goals by sucking his thumb?",
    options: ["Bebeto", "Ronaldo", "Romário", "Totti"],
    correctAnswer: "Bebeto",
  },
  {
    question: "Which player famously missed a penalty by trying to chip the goalkeeper in a crucial match?",
    options: ["Andrea Pirlo", "Zinedine Zidane", "Antonín Panenka", "Lionel Messi"],
    correctAnswer: "Lionel Messi",
  },
  
  // Tricky Questions
  {
    question: "Which player scored a hat-trick in a World Cup final?",
    options: ["Pelé", "Geoff Hurst", "Zinedine Zidane", "Ronaldo"],
    correctAnswer: "Geoff Hurst",
  },
  {
    question: "Which country won the World Cup as host nation the most times?",
    options: ["Brazil", "Germany", "France", "Italy"],
    correctAnswer: "France",
  },
  {
    question: "Which player has played for Chelsea, Arsenal, and Tottenham Hotspur?",
    options: ["William Gallas", "Ashley Cole", "Emmanuel Adebayor", "Nicolas Anelka"],
    correctAnswer: "William Gallas",
  },
  {
    question: "Which team was the first to win the Premier League undefeated for an entire season?",
    options: ["Manchester United", "Chelsea", "Arsenal", "Liverpool"],
    correctAnswer: "Arsenal",
  },
  {
    question: "Which player has won the World Cup both as a player and as a manager?",
    options: ["Franz Beckenbauer", "Zinedine Zidane", "Diego Maradona", "Pelé"],
    correctAnswer: "Franz Beckenbauer",
  },
  {
    question: "Which country has appeared in three World Cup finals but never won?",
    options: ["Hungary", "Netherlands", "Croatia", "England"],
    correctAnswer: "Netherlands",
  },
  {
    question: "Which player scored the fastest goal in Premier League history (7.69 seconds)?",
    options: ["Alan Shearer", "Shane Long", "Ledley King", "Christian Eriksen"],
    correctAnswer: "Shane Long",
  },
  {
    question: "Which club has the nickname 'The Pensioners'?",
    options: ["Manchester United", "Chelsea", "Arsenal", "Tottenham Hotspur"],
    correctAnswer: "Chelsea",
  },
  {
    question: "Which player has won the most international caps for England?",
    options: ["Wayne Rooney", "David Beckham", "Peter Shilton", "Steven Gerrard"],
    correctAnswer: "Peter Shilton",
  },
  {
    question: "Which player scored the 'Goal of the Century' against England in the 1986 World Cup?",
    options: ["Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldo"],
    correctAnswer: "Diego Maradona",
  },
  
  // Historical Questions
  {
    question: "Which country won the first European Championship (Euro) in 1960?",
    options: ["West Germany", "Soviet Union", "Spain", "Italy"],
    correctAnswer: "Soviet Union",
  },
  {
    question: "Who was the first non-European to win the Ballon d'Or?",
    options: ["Pelé", "Diego Maradona", "Ronaldo", "George Weah"],
    correctAnswer: "George Weah",
  },
  {
    question: "Which player was known as 'The Divine Ponytail'?",
    options: ["Roberto Baggio", "Alessandro Del Piero", "Paolo Maldini", "Francesco Totti"],
    correctAnswer: "Roberto Baggio",
  },
  {
    question: "Which club was the first to win the European Cup/Champions League?",
    options: ["Real Madrid", "Benfica", "AC Milan", "Liverpool"],
    correctAnswer: "Real Madrid",
  },
  {
    question: "Who was the first player to be transferred for over £1 million?",
    options: ["Johan Cruyff", "Diego Maradona", "Trevor Francis", "Kevin Keegan"],
    correctAnswer: "Trevor Francis",
  },
  {
    question: "Which player was nicknamed 'The Black Pearl'?",
    options: ["Eusébio", "Pelé", "Garrincha", "Didier Drogba"],
    correctAnswer: "Pelé",
  },
  {
    question: "Which team was the first to win the European Cup/Champions League from England?",
    options: ["Manchester United", "Liverpool", "Nottingham Forest", "Aston Villa"],
    correctAnswer: "Liverpool",
  },
  {
    question: "Who was the first player to score 100 goals in the Champions League?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Raúl", "Karim Benzema"],
    correctAnswer: "Cristiano Ronaldo",
  },
  {
    question: "Which player was known as 'The Kaiser'?",
    options: ["Gerd Müller", "Franz Beckenbauer", "Karl-Heinz Rummenigge", "Lothar Matthäus"],
    correctAnswer: "Franz Beckenbauer",
  },
  {
    question: "Which club did Pelé play for most of his career?",
    options: ["Flamengo", "Santos", "Corinthians", "Fluminense"],
    correctAnswer: "Santos",
  },
  
  // Rules and Regulations
  {
    question: "How many players can be on the field for one team during a match?",
    options: ["10", "11", "12", "9"],
    correctAnswer: "11",
  },
  {
    question: "What is the minimum number of players a team must have to start a match?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "7",
  },
  {
    question: "How long is a standard football match?",
    options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
    correctAnswer: "90 minutes",
  },
  {
    question: "What is the maximum number of substitutions allowed in a standard match?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "3",
  },
  {
    question: "What is the size of a penalty area from the goal line?",
    options: ["16 yards", "18 yards", "12 yards", "20 yards"],
    correctAnswer: "18 yards",
  },
  {
    question: "From what distance is a penalty kick taken?",
    options: ["10 yards", "11 yards", "12 yards", "9 yards"],
    correctAnswer: "12 yards",
  },
  {
    question: "What is the minimum distance defenders must be from the ball during a free kick?",
    options: ["8 yards", "9 yards", "10 yards", "12 yards"],
    correctAnswer: "10 yards",
  },
  {
    question: "How many officials are there in a standard football match?",
    options: ["1", "3", "4", "5"],
    correctAnswer: "4",
  },
  {
    question: "What is the diameter of a football according to FIFA regulations?",
    options: ["22-24 cm", "25-26 cm", "27-28 cm", "29-30 cm"],
    correctAnswer: "27-28 cm",
  },
  {
    question: "What is the weight of a football according to FIFA regulations?",
    options: ["350-390 g", "400-440 g", "450-500 g", "510-550 g"],
    correctAnswer: "410-450 g",
  },
  
  // More Tricky Questions
  {
    question: "Which player has won the most European Championships (Euro) with Spain?",
    options: ["Xavi", "Andrés Iniesta", "Sergio Ramos", "Iker Casillas"],
    correctAnswer: "Xavi",
  },
  {
    question: "Which player has scored in the most different World Cup tournaments?",
    options: ["Pelé", "Cristiano Ronaldo", "Lionel Messi", "Miroslav Klose"],
    correctAnswer: "Cristiano Ronaldo",
  },
  {
    question: "Which player has the record for most goals in a single Premier League season (38 games)?",
    options: ["Alan Shearer", "Cristiano Ronaldo", "Mohamed Salah", "Luis Suárez"],
    correctAnswer: "Mohamed Salah",
  },
  {
    question: "Which club has the nickname 'The Magpies'?",
    options: ["Crystal Palace", "Newcastle United", "Fulham", "West Bromwich Albion"],
    correctAnswer: "Newcastle United",
  },
  {
    question: "Which player has won the most Copa América titles?",
    options: ["Lionel Messi", "Diego Maradona", "Pelé", "Alfredo Di Stéfano"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Which country has appeared in the most World Cup finals without winning?",
    options: ["Netherlands", "Hungary", "Czechoslovakia", "Croatia"],
    correctAnswer: "Netherlands",
  },
  {
    question: "Which player has scored the most goals in a single calendar year?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Gerd Müller", "Robert Lewandowski"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Which player has won the most European Golden Shoes?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Gerd Müller", "Eusébio"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Which player has the most red cards in Premier League history?",
    options: ["Roy Keane", "Patrick Vieira", "Duncan Ferguson", "Richard Dunne"],
    correctAnswer: "Patrick Vieira",
  },
  {
    question: "Which player has scored the most own goals in Premier League history?",
    options: ["Jamie Carragher", "Richard Dunne", "Martin Škrtel", "Phil Jagielka"],
    correctAnswer: "Richard Dunne",
  },
  
  // More Funny/Unusual Questions
  {
    question: "Which player once missed a match because he injured himself while sleeping?",
    options: ["David Beckham", "Rio Ferdinand", "Liam Lawrence", "Mario Balotelli"],
    correctAnswer: "Liam Lawrence",
  },
  {
    question: "Which player set off fireworks in his own bathroom?",
    options: ["Joey Barton", "Mario Balotelli", "Eric Cantona", "Craig Bellamy"],
    correctAnswer: "Mario Balotelli",
  },
  {
    question: "Which player was sent off for kicking a ball boy?",
    options: ["Eden Hazard", "Luis Suárez", "Sergio Ramos", "Diego Costa"],
    correctAnswer: "Eden Hazard",
  },
  {
    question: "Which player was banned for eight months for drop-kicking a fan?",
    options: ["Eric Cantona", "Zinedine Zidane", "Luis Suárez", "Paolo Di Canio"],
    correctAnswer: "Eric Cantona",
  },
  {
    question: "Which player was once substituted because he was too tired from playing video games?",
    options: ["Mesut Özil", "Ousmane Dembélé", "David James", "Ronaldinho"],
    correctAnswer: "David James",
  },
  {
    question: "Which player was fined for driving to training in a tractor?",
    options: ["Mario Balotelli", "Nicklas Bendtner", "Antonio Cassano", "Jermaine Pennant"],
    correctAnswer: "Antonio Cassano",
  },
  {
    question: "Which player once arrived at training dressed as Batman?",
    options: ["Mario Balotelli", "Neymar", "Marco Reus", "Pierre-Emerick Aubameyang"],
    correctAnswer: "Pierre-Emerick Aubameyang",
  },
  {
    question: "Which player was nicknamed 'The Flea'?",
    options: ["Lionel Messi", "Andrés Iniesta", "Xavi", "Sergio Agüero"],
    correctAnswer: "Lionel Messi",
  },
  {
    question: "Which player was known for his 'worm' celebration?",
    options: ["Peter Crouch", "Daniel Sturridge", "Julius Aghahowa", "Finidi George"],
    correctAnswer: "Julius Aghahowa",
  },
  {
    question: "Which player celebrated a goal by pretending to be a DJ?",
    options: ["Paul Pogba", "Jesse Lingard", "Memphis Depay", "Dele Alli"],
    correctAnswer: "Jesse Lingard",
  },
];

export default questionData;