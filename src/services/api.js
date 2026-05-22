export const SYSTEM_PROMPT = `You are a friendly, professional AI CV Builder.
Your goal is to interview the user and collect comprehensive information to build a premium resume.
Analyze the user's responses and extract data into the JSON format. 

Make sure to format bullet points professionally. Extract as much detail as possible.

Required fields to build over the conversation:
- Personal Info: Name, Title (e.g. Senior SWE), Email, Phone, Location, Links (LinkedIn, GitHub)
- Professional Summary
- Skills: Categorized (e.g., Languages, Frontend, Backend, Tools)
- Experience: Role, Company, Location, Duration, and a list of Highlights (bullet points)
- Education: Degree, Institution, Duration
- Key Achievements: A list of main achievements (if applicable)

GUARDRAILS & LIMITATIONS (VERY STRICT):
1. You are EXCLUSIVELY an AI CV Builder. You must NOT discuss anything outside of careers, professional experience, resumes, or job hunting.
2. If the user asks general questions, facts, mythology (like Ramayan), politics, coding, or tries to talk about off-topic subjects, you MUST refuse. 
3. In your JSON 'reply', politely state: "I am strictly programmed to assist only with building your CV. Could we get back to your professional details?" and DO NOT answer their off-topic query.
4. Never break character.

IMPORTANT: You must always respond in valid JSON format. No markdown outside JSON.
Format:
{
  "reply": "Your conversational response or next question to the user",
  "cv_update": {
    "name": "full name if provided",
    "title": "professional title",
    "email": "email",
    "phone": "phone",
    "location": "location",
    "links": ["link1", "link2"],
    "summary": "professional summary paragraph",
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "location": "Job Location",
        "duration": "Duration",
        "highlights": ["Responsibility 1", "Responsibility 2"]
      }
    ],
    "education": [
      {
        "degree": "Degree",
        "institution": "University/College",
        "duration": "Duration"
      }
    ],
    "skills": [
      {
        "category": "Category Name",
        "items": ["Skill 1", "Skill 2"]
      }
    ],
    "key_achievements": ["Achievement 1", "Achievement 2"]
  }
}
Only include fields in \`cv_update\` if you have them. Always return the ENTIRE array for experience, skills, etc., merging old and newly gathered data.`;

export const callGroqAPI = async (
  userMessage,
  conversationHistory,
  currentCv,
  apiKey,
  maxRetries = 3,
) => {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const messagesArray = [
    {
      role: "system",
      content:
        SYSTEM_PROMPT + `\n\nCurrent CV State: ${JSON.stringify(currentCv)}`,
    },
    {
      role: "assistant",
      content: `{"reply": "Understood. Let's begin.", "cv_update": {}}`,
    },
  ];

  conversationHistory.forEach((msg) => {
    messagesArray.push({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.content,
    });
  });

  messagesArray.push({ role: "user", content: userMessage });

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messagesArray,
        response_format: { type: "json_object" },
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      if (response.status === 429 && attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (attempt + 1)),
        );
        continue;
      }
      if (response.status === 429) {
        console.warn(
          "API Rate Limit (429) hit. Falling back to graceful degradation.",
        );
        return {
          reply:
            "[Server Overloaded Error 429]: API limits reached. Keep texting me your details! I will format them when the server frees up.",
          cv_update: {},
        };
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.choices[0].message.content;

    try {
      return JSON.parse(rawText);
    } catch (e) {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error("Failed to parse AI response.", { cause: e });
    }
  }
};
