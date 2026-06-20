// chain.js

import { config } from "dotenv";
config();

// 1. Import model
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 2. Import prompt template
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 3. Create model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// 4. Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words for a beginner."
);

// 5. BUILD CHAIN (THIS is your chain)
const chain = prompt.pipe(model);

// 6. Run chain with a user input
const response = await chain.invoke({
  topic: "quantum computing",
});

// 7. Output
console.log(response.content);