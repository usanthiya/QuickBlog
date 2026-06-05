import { GEMINI_API_KEY, LLM_ENDPOINT } from "../config/env.js";

export const generateBlogContent = async (title) => {
  const endpoint = LLM_ENDPOINT || "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
  const apiKey = GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set");
  }

  const prompt = `Generate a subtitle, a short description, and a full blog body for the following title.
Title: "${title}"
Format the response strictly as:
Subtitle: <subtitle>
Description: <description>
Body: <body>`;

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API Error:", errorText);
    throw new Error(`Gemini API failed with status ${response.status}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const generatedText = parts.map(p => p.text).join("\n");

  const subtitleMatch = generatedText.match(/Subtitle:\s*(.*?)\n/i);
  const descriptionMatch = generatedText.match(/Description:\s*(.*?)\n/i);
  const bodyMatch = generatedText.match(/Body:\s*([\s\S]*)/i);

  const subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";
  const description = descriptionMatch ? descriptionMatch[1].trim() : "";
  const body = bodyMatch ? bodyMatch[1].trim() : generatedText; // fallback to whole text if parse fails

  return { title, subtitle, description, body };
};
