import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const speechFile = path.resolve('./speech.mp3');

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  organization: process.env.NEXT_PUBLIC_ORG_KEY,
  project: process.env.NEXT_PUBLIC_PROJECT_KEY,
});

export async function POST(request: Request, res: Response) {
  try {
    const { text } = await request.json();
    console.log('text: ', text);

    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: text,
      response_format: 'mp3',
    });

    // const buffer = Buffer.from(await response.arrayBuffer());
    // await fs.promises.writeFile(speechFile, buffer);

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
