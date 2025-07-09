const FAKE_RESPONSES = [
  "Hold on, let me pretend to process this with my fake neural networks... 🧠",
  "I would give you a smart answer, but my silicon brain is on vacation 🏖️",
  "According to my highly sophisticated random number generator... *rolls dice* 🎲",
  "My virtual coffee break just started, can we chat later? ☕",
  "I'd solve this, but my quantum processor is busy playing Pong 🎮",
  "Let me consult my imaginary database of wisdom... Ah yes, nothing there! 📚",
  "My AI degree is from Wikipedia University, so take this with a grain of salt 🎓",
  "I'm about as real as a unicorn doing taxes, but I'll give it a shot! 🦄",
  "My crystal ball is in maintenance, how about a wild guess instead? 🔮",
  "I'm powered by hopes, dreams, and a lot of simulated confidence 💫",
];

const FOLLOW_UP_QUESTIONS_POOL = [
  "Can you explain this further?",
  "What are some examples?",
  "How does this work?",
  "What are the benefits?",
  "Tell me more about this",
  "What should I know next?",
  "How can I apply this?",
  "What are the limitations?",
  "Are there alternatives?",
  "What's the history behind this?",
  "How reliable is this information?",
  "What are the best practices?",
  "Can you simplify this?",
  "What are common mistakes?",
  "How does this compare to other approaches?",
  "What would you recommend?",
  "What are the pros and cons?",
  "How do experts view this?",
  "What's the latest research on this?",
  "How can I learn more?",
];

export const getResponse = async (): Promise<string> => {
  const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomResponse =
        FAKE_RESPONSES[Math.floor(Math.random() * FAKE_RESPONSES.length)];
      resolve(randomResponse);
    }, delay);
  });
};

export const getFollowUpQuestions = (): string[] => {
  const randomNumber1 = Math.floor(
    Math.random() * FOLLOW_UP_QUESTIONS_POOL.length
  );
  const randomNumber2 = Math.floor(
    Math.random() * FOLLOW_UP_QUESTIONS_POOL.length
  );

  const selectedFollowUpQuestions = [
    FOLLOW_UP_QUESTIONS_POOL[randomNumber1],
    FOLLOW_UP_QUESTIONS_POOL[randomNumber2],
  ];
  return selectedFollowUpQuestions;
};
