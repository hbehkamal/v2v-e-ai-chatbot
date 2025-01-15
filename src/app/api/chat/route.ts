import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  organization: process.env.NEXT_PUBLIC_ORG_KEY,
  project: process.env.NEXT_PUBLIC_PROJECT_KEY,
});

export async function POST(request: Request, res: Response) {
  try {
    const { text } = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ content: text, role: 'user' }],
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error: any) {
    console.error(
      'Error calling OpenAI API:',
      error.response?.data || error.message
    );

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
