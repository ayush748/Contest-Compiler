import { response } from "@/app/types/types";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import data  from "../../sampleData/gpt_responses.json"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {



    // setTimeout(() => {
      
    // }, 2000);
  return NextResponse.json(data, { status: 200 });

  try {
    const { problem } = await req.json();

    if (!problem) {
      return NextResponse.json({ error: "Missing problem text" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" }, // forces JSON output
      messages: [
        {
          role: "system",
          content: `You are a coding tutor. Respond ONLY with valid JSON matching this TypeScript type:

export interface response {
  hints: (
    | { type: "conceptual"; hint: string }
    | { type: "Algorithmic"; hint: string }
    | { type: "implementation"; hint: string }
    | { type: "other"; hint: string }
    | { type: "topics"; hint: string[] }
  )[];
  standard_io: {
    stdin: string;
    expected_output: string;
  };
  testCases: {
    input: (
      | { type: "array"; value: any[]; name: string }
      | { type: "number"; value: number; name: string }
      | { type: "string"; value: string; name: string }
    )[];
    expected_output: string;
  }[];
}`,
        },
        { role: "user", content: `Problem:\n${problem}` },
      ],
    });

    const aiMessage = completion.choices[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json({ error: "No AI response" }, { status: 500 });
    }

    const parsed: response = JSON.parse(aiMessage);

    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
  }
}
