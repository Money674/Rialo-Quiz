const quizData = [
  { question: "What does Rialo describe itself as?", options: ["A traditional Layer-1 blockchain","A real-world blockchain with native external connectivity","A DeFi lending protocol","A token swap DEX"], answer: 1 },
  { question: "Which company is building Rialo?", options: ["ConsenSys","Subzero Labs","Ethereum Foundation","Binance Labs"], answer: 1 },
  { question: "What is one of the key features of Rialo’s design?", options: ["No smart contract support","Native Web access for smart contracts (API calls)","Only supports ERC-20 tokens","Centralized custodial control"], answer: 1 },
  { question: "Rialo claims to support what kind of transaction speed?", options: ["Minutes","Hours","Sub-second","Days"], answer: 2 },
  { question: "Which of the following is a built-in capability of Rialo (as claimed)?", options: ["Oracles only","Bridges only","Scheduling, event-driven logic, privacy, identity","Only token minting"], answer: 2 },
  { question: "What does the acronym “Rialo” jokingly stand for (in one slogan)?", options: ["Really Is A Layer One","Rialo Isn’t A Layer 1","Rialo Is Another L One","Rialo Is A Lean Option"], answer: 1 },
  { question: "Who are the co-founders of Rialo?", options: ["Vitalik Buterin & Gavin Wood","Sam Bankman & Caroline Ellison","Ade Adepoju & Lu Zhang","Changpeng Zhao & He Yi"], answer: 2 },
  { question: "How much funding has Rialo raised (in its early round) according to sources?", options: ["$1 million","$5 million","$20 million","$100 million"], answer: 2 },
  { question: "Which investors are mentioned as backers of Rialo?", options: ["Sequoia, SoftBank","Pantera Capital, Coinbase Ventures, Hashed, Variant","Tiger Global, Coatue","BlackRock, Fidelity"], answer: 1 },
  { question: "Rialo supports which virtual machine compatibility?", options: ["EVM only","Solana VM compatibility","Bitcoin VM","Cardano VM"], answer: 0 },
  { question: "What is one use case highlighted in a developer’s testimonial about Rialo?", options: ["Building gaming graphics","Automating event-triggered smart contract flows without cron jobs","Creating simple token minting","Designing wallets only"], answer: 1 },
  { question: "Which of the following is NOT claimed as a capability of Rialo?", options: ["Confidential computing / privacy","Identity via phone / email / social accounts","Built-in oracle marketplace only","Real-time execution and event scheduling"], answer: 2 },
  { question: "What problem is Rialo trying to solve in the Web3 / blockchain space?", options: ["High token inflation","The disconnection from off-chain data and reactive logic","Lack of NFTs","Limited wallet choices"], answer: 1 },
  { question: "When was Rialo founded (or first publicly introduced)?", options: ["2017","2020","2025","2030"], answer: 2 },
  { question: "What is one feature that Rialo claims removes the need for (traditional) bridges?", options: ["Native data and asset flow across ecosystems","Manual token wrapping only","Custodial transfer service","Centralized exchange reliance"], answer: 0 }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart");

function showQuestion() {
  if (current >= quizData.length) {
    document.getElementById("quiz").classList.add("hidden");
    scoreEl.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${quizData.length}`;
    return;
  }

  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => { if(i===q.answer) score++; current++; showQuestion(); };
    optionsEl.appendChild(btn);
  });
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  scoreEl.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

showQuestion();
