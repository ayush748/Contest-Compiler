import { NextResponse } from "next/server";

type Body = { problemText: string };

function extractJsonArray(text: string) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) return null;
  const json = text.slice(start, end + 1);
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { problemText } = (await req.json()) as Body;
    if (!problemText || problemText.trim().length === 0) {
      return NextResponse.json({ testcases: [] });
    }

    // Build a prompt that asks for clean JSON
    const prompt = `
You are given a programming problem statement. Extract representative input/output test cases.
Return a strict JSON array only (nothing else) in the format:
[
  { "input": "<stdin string>", "expected_output": "<expected stdout string>" },
  ...
]
If the problem includes multiple input lines or multiple values, keep them exactly as they should be passed on stdin.
Problem:
${problemText}
`;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // if unavailable in your account, switch to "gpt-4o" or "gpt-4o-mini"
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 800,
      }),
    });

    const j = await r.json();

    // Try to read response text
    const content =
      j?.choices?.[0]?.message?.content ?? j?.choices?.[0]?.text ?? "";

    // Extract JSON substring if model included commentary
    const parsed = extractJsonArray(content);
    if (parsed) {
      // Normalize fields: allow models returning {input, output} etc.
      const normalized = parsed.map((p: any) => ({
        input: p.input ?? p.stdin ?? p.in ?? "",
        expected_output: p.expected_output ?? p.output ?? p.stdout ?? "",
      }));
      return NextResponse.json({ testcases: normalized });
    }

    // fallback: return empty
    return NextResponse.json({ testcases: [] });
  } catch (err: any) {
    return NextResponse.json({ testcases: [], error: err.message || String(err) });
  }
}
