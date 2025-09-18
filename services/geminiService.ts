
import { GoogleGenAI, Type } from "@google/genai";
import type { Solution } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const solutionSchema = {
  type: Type.OBJECT,
  properties: {
    errorSummary: {
      type: Type.STRING,
      description: "A brief, one-sentence summary of the core error message.",
    },
    cause: {
      type: Type.STRING,
      description: "A clear and concise explanation of the most likely cause of the error. Explain it like I'm a junior developer.",
    },
    stepsToResolve: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of actionable, step-by-step instructions to fix the error.",
    },
    codeExample: {
      type: Type.STRING,
      description: "A small, corrected code snippet that demonstrates the fix. If not applicable, return 'N/A'.",
    },
  },
  required: ["errorSummary", "cause", "stepsToResolve", "codeExample"],
};

export async function getSolution(errorLog: string): Promise<Solution> {
  try {
    const prompt = `
      Analyze the following terminal error log. Your task is to act as an expert developer and provide a clear, concise, and actionable solution.
      
      Error Log:
      ---
      ${errorLog}
      ---
      
      Based on the log, please provide a response in the requested JSON format. The explanation should be easy for a junior developer to understand.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: solutionSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Basic validation to ensure the parsed object matches the Solution structure
    if (
      !parsedJson.errorSummary ||
      !parsedJson.cause ||
      !Array.isArray(parsedJson.stepsToResolve)
    ) {
      throw new Error("Received an invalid JSON structure from the API.");
    }

    return parsedJson as Solution;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get solution from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
}
