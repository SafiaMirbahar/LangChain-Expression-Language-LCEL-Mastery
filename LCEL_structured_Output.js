// chain.js

import { config } from "dotenv";
config();

// 1. Import model
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// 2. Import prompt template
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 3. Import Output Parser (THIS is your new addition)
import { StringOutputParser } from "@langchain/core/output_parsers";

// 4. Create model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// 5. Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  "Explain {topic} in simple words for a beginner."
);

// 6. Create output parser (forces clean string output)
const outputParser = new StringOutputParser();

// 7. BUILD CHAIN (prompt → model → parser)
const chain = prompt.pipe(model).pipe(outputParser);

// 8. Run chain
const response = await chain.invoke({
  topic: "quantum computing",
});

// 9. Print output
console.log("🧠 Final Output:\n");
console.log(response);