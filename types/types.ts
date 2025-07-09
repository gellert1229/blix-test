export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
};

export type AIMessage = Message & {
  followUpQuestions: string[];
};
