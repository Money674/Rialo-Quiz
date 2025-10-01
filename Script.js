const quizData = [
    {
        question: "What is the full name of the company behind Rialo blockchain?",
        options: ["Zero Labs", "Subzero Labs", "Meta Labs", "Rialo Labs"],
        correct: 1
    },
    {
        question: "How much funding did Subzero Labs raise in their initial seed round?",
        options: ["$15 million", "$25 million", "$20 million", "$30 million"],
        correct: 2
    },
    {
        question: "Which investment firm led Subzero Labs' seed funding round?",
        options: ["Coinbase Ventures", "Variant Fund", "Hashed", "Pantera Capital"],
        correct: 3
    },
    {
        question: "Who are the co-founders of Subzero Labs?",
        options: ["Ade Adepoju and Sam Zhang", "Ade Adepoju and Lu Zhang", "Lu Zhang and George Danezis", "Ade Adepoju and Evan Cheng"],
        correct: 1
    },
    {
        question: "What does \"Rialo\" stand for according to the company?",
        options: ["Real Internet Application Layer One", "Rialo isn't a layer 1", "Real-time Internet Application Logic Oracle", "Revolutionary Internet and Application Layer Operations"],
        correct: 1
    },
    {
        question: "Before founding Subzero Labs, both co-founders worked at which company?",
        options: ["Meta", "Netflix", "Mysten Labs", "Google"],
        correct: 2
    },
    {
        question: "What blockchain project did the co-founders previously contribute to at Mysten Labs?",
        options: ["Ethereum", "Solana", "Sui", "Avalanche"],
        correct: 2
    },
    {
        question: "What is one of Rialo's key technical features that eliminates the need for oracles?",
        options: ["Native web connectivity with HTTPS calls", "Cross-chain bridges", "AI-powered predictions", "Quantum computing integration"],
        correct: 0
    },
    {
        question: "According to Rialo's Twitter posts, how fast can they deliver real-time price data?",
        options: ["Under 500ms latency", "Under 200ms latency", "Under 100ms latency", "Under 50ms latency"],
        correct: 2
    },
    {
        question: "What architecture does Rialo combine for its execution environment?",
        options: ["EVM and Solana VM", "RISC-V and Solana VM", "WASM and EVM", "x86 and ARM"],
        correct: 1
    },
    {
        question: "How many Discord members did Rialo gain in their first 13 days after launch?",
        options: ["50,000 members", "75,000 members", "100,000 members", "150,000 members"],
        correct: 2
    },
    {
        question: "What major conference did Rialo attend in Singapore?",
        options: ["Consensus 2025", "Token 2049", "DevCon", "Blockchain Week"],
        correct: 1
    },
    {
        question: "Lu Zhang (CTO) previously worked on which Meta project?",
        options: ["Facebook Connect", "Meta AI", "Diem (formerly Libra)", "Instagram API"],
        correct: 2
    },
    {
        question: "What does Rialo claim to enable for smart contracts that traditional blockchains cannot?",
        options: ["Faster transaction processing only", "Direct integration with real-world APIs and event-driven execution", "Lower gas fees only", "Better security only"],
        correct: 1
    },
    {
        question: "According to Rialo's philosophy, what device analogy do they use to describe their approach to blockchain?",
        options: ["Like a personal computer integrating all components", "Like the iPhone integrating GPS, cameras, and internet into one device", "Like a game console combining entertainment features", "Like a smartwatch combining fitness and communication"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// DOM elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const progressFill = document.getElementById('progressFill');
const resultsContainer = document.getElementById('resultsContainer');
const quizContainer = document.querySelector('.quiz-container');
const finalScore = document.getElementById('finalScore');
const scorePercentage = document.getElementById('scorePercentage');
const scoreMessage = document.getElementById('scoreMessage');
const restartQuizBtn = document.getElementById('restartQuizBtn');

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    totalQuestions.textContent = quizData.length;
    showQuestion();
    updateProgressBar();
    
    // Show quiz container and hide results
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
}

// Display current question
function showQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    questionNumber.textContent = currentQuestion + 1;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
        optionBtn.onclick = () => selectOption(index, optionBtn);
        optionsContainer.appendChild(optionBtn);
    });
    
    // Reset next button
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Handle option selection
function selectOption(answerIndex, optionElement) {
    // Remove previous selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    
    selectedAnswer = answerIndex;
    optionElement.classList.add('selected');
    nextBtn.disabled = false;
}

// Handle next question
function nextQuestion() {
    const question = quizData[currentQuestion];
    
    // Show correct/incorrect answers
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Wait a moment to show the correct answer, then proceed
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            showQuestion();
            updateProgressBar();
        } else {
            showResults();
        }
    }, 1500);
    
    // Disable next button temporarily
    nextBtn.disabled = true;
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Show final results
function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    finalScore.textContent = score;
    const percentage = Math.round((score / quizData.length) * 100);
    scorePercentage.textContent = `${percentage}%`;
    
    // Set score message based on performance
    let message = '';
    if (percentage >= 90) {
        message = '🏆 Outstanding! You\'re a Rialo expert!';
    } else if (percentage >= 80) {
        message = '🎯 Great job! You know Rialo very well!';
    } else if (percentage >= 70) {
        message = '👍 Good work! You have solid knowledge about Rialo.';
    } else if (percentage >= 60) {
        message = '📚 Not bad! Consider learning more about Rialo.';
    } else {
        message = '🔄 Keep learning! Visit rialo.io to discover more.';
    }
    
    scoreMessage.textContent = message;
}

// Event listeners
nextBtn.addEventListener('click', nextQuestion);
restartQuizBtn.addEventListener('click', initQuiz);

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', initQuiz);
