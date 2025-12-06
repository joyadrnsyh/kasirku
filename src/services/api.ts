// api.ts
export async function sendMessageToGemini(message: string) {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${
          errorData.error?.message || 'Unknown error'
        }`
      );
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, AI tidak merespon.';

    return { reply };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { reply: "Maaf, AI tidak merespon." };
  }
}
