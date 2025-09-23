import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/gemini";
import { auth } from "auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Check user authentication (optional)
    const session = await auth();

    const { userInput } = await req.json();
    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid userInput" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert content repurposer for developers, marketers, and founders.\n\nTake the following input text and generate five outputs in a structured JSON format:\n\nINPUT TEXT:\n"""\n${userInput}\n"""\n\nREQUIREMENTS:\n1. Summarize the text into 3-5 concise bullet points.\n2. Generate a tweet thread (5–8 tweets, each under 280 characters, numbered).\n3. Write a professional LinkedIn post (1-2 short paragraphs, engaging and shareable).\n4. Create a newsletter draft (include a title, intro, main body, and a call-to-action).\n5. Suggest 8-12 relevant hashtags and 5-10 SEO-friendly keywords.\n\nOUTPUT FORMAT (JSON):\n{\n  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],\n  "tweetThread": ["1/ tweet text", "2/ tweet text", "3/ tweet text"],\n  "linkedInPost": "LinkedIn post text here",\n  "newsletter": {\n    "title": "Newsletter Title",\n    "intro": "Short introduction paragraph",\n    "body": "Main body content of the newsletter",\n    "cta": "Engaging call to action"\n  },\n  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],\n  "keywords": ["keyword1", "keyword2", "keyword3"]\n}\n\nRULES:\n- Return valid JSON only, no extra commentary.\n- Keep the tone professional but approachable.\n- Do not exceed character limits for tweets.\n- Prefer hashtags and keywords relevant to tech, startups, or content creation if applicable.`;

    const geminiResponse = await generateGeminiText(prompt);
    // Strip markdown code block if present
    let jsonString = geminiResponse.trim();
    if (jsonString.startsWith("```json")) {
      jsonString = jsonString
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    } else if (jsonString.startsWith("```")) {
      jsonString = jsonString.replace(/^```/, "").replace(/```$/, "").trim();
    }
    try {
      const json = JSON.parse(jsonString);
      // Debug: log the session object
      console.log('Session object:', session);
      // Save to database only if user is authenticated
      if (session?.user?.id) {
        try {
          const result = await prisma.generation.create({
            data: {
              userId: session.user.id,
              inputText: userInput,
              outputText: JSON.stringify(json),
            },
          });
          console.log('Generation saved:', result);
        } catch (error) {
          console.error('Error saving generation:', error);
        }
      }
      return NextResponse.json(json);
    } catch {
      // If not valid JSON, return the raw response for debugging
      return NextResponse.json(
        { error: "Invalid JSON from Gemini", raw: geminiResponse },
        { status: 502 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
