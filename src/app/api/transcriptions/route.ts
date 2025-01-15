import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { Uploadable } from 'openai/uploads.mjs';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  organization: process.env.NEXT_PUBLIC_ORG_KEY,
  project: process.env.NEXT_PUBLIC_PROJECT_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await openai.audio.transcriptions.create({
      model: 'whisper-1', // Using Whisper model for audio-to-text
      file: formData.get('file') as Uploadable,
    });

    return NextResponse.json(response);
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
