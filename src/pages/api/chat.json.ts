import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET({}) {
  return new Response(JSON.stringify({ msg: "Gemini pro builders" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.NEW_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const body = await request.json();

    return new Response("response", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the AI response:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the AI response" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};