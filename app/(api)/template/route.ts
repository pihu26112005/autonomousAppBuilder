import { NextRequest, NextResponse } from "next/server";
import { reactFinalPrompt } from "@/libs/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { reactBaseTemplate } from "@/libs/baseTemplate";

const AGENT_AI_URL = "https://api-lr.agent.ai/v1/action/invoke_llm";
const AGENT_AI_TOKEN = process.env.AGENT_AI_TOKEN; // Store your API key in .env.local

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Store API key in .env.local
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

            return NextResponse.json({
                prompts : [reactFinalPrompt],
                uiPrompts : [reactBaseTemplate]
            });

    } catch (error) {
        console.error("Error in /template:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
