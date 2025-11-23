import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
// Note: In a production app, handle the missing key more gracefully.
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getIslamicAdvice = async (query: string): Promise<string> => {
  if (!ai) return "AI Service is currently unavailable (API Key missing).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: "You are a knowledgeable and gentle Islamic assistant for the iMosque app. Provide concise, respectful, and moderate advice based on general Islamic principles. Avoid controversial fatwas. Keep answers under 150 words if possible. Use a warm, welcoming tone.",
      }
    });

    return response.text || "I apologize, I could not generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong while connecting to the AI Ustadz. Please try again later.";
  }
};
