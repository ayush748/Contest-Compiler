import { judge0Response } from "@/app/sampleData/judge_responses";
import { NextRequest, NextResponse } from "next/server";

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const JUDGE0_KEY = process.env.JUDGE0_API_KEY!; // put your key in .env.local

export async function POST(req: NextRequest) {


  setTimeout(() => {
    
  }, 2000);

  return NextResponse.json(judge0Response);

  try {
    const { source_code, language_id, stdin } = await req.json();

    if (!source_code || !language_id) {
      return NextResponse.json(
        { error: "source_code and language_id are required" },
        { status: 400 }
      );
    }

    const response = await fetch(JUDGE0_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code,
        language_id,
        stdin: stdin || "",
        expected_output: "",
        args: [],
        compiler_options: "",

      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
}
