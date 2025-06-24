import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Store API key in .env.local
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const AGENT_AI_URL = "https://api-lr.agent.ai/v1/action/invoke_llm";
const AGENT_AI_TOKEN = process.env.AGENT_AI_TOKEN; // Store your API key in .env.local

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        // console.log("Messages: ", messages);

        // const response = await fetch(AGENT_AI_URL, {
        //     method: "POST",
        //     headers: {
        //         Authorization: `Bearer ${AGENT_AI_TOKEN}`,
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         // instructions: `${getSystemPrompt()}, \n\n i am providing what you have to do today in following chat manner : ${messages}`,
        //         // query: messages[messages.length - 1]?.content || "",
        //         instructions: messages,
        //         llm_engine: "gpt4o", // Using GPT-4o
        //     }),
        // });

        // const result = await response.json();
        // return NextResponse.json({ response: result?.response });

        const userMessage = messages[messages.length - 1]?.content || "";
        // console.log("User Message: ", userMessage);

        // Generate response from Gemini
        const result = await model.generateContent(messages);
        // const result = await model.generateContent({
        //     contents: messages,
        //     generationConfig: {
        //       maxOutputTokens: 8000,
        //       temperature: 0,
        //     }
        // });
        const assistantResponse = result.response.text().trim(); // Extract text response

        return NextResponse.json({ response: assistantResponse });


    } catch (error) {
        console.error("Error in /chat:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
