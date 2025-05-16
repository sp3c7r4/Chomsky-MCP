import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { OpenAIVoice } from "@mastra/voice-openai";
import { getMicrophoneStream } from "@mastra/node-audio";
import { DeepgramVoice } from "@mastra/voice-deepgram";
import fs from 'fs'

const mp3Stream = fs.createReadStream('./greeting.mp3');
 
const voice = new DeepgramVoice({
  speechModel: {
    name: 'aura',
    apiKey: process.env.DEEPGRAM_API_KEY ,
  },
  listeningModel: {
    name: 'nova-2',
    apiKey: process.env.DEEPGRAM_API_KEY,
  },
  speaker: "asteria-en",
});
 
export const agent = new Agent({
  name: "Voice Agent",
  instructions:
    "You are a voice assistant that provides recommendations based on user input.",
  model: google("gemini-2.0-flash-001"),
  voice,
});
 
const transcript = await agent.voice.listen(mp3Stream, {
  filetype: "mp3", // Optional: specify the audio file type
});


console.log(`User said: ${transcript}`);

const { text } = await agent.generate(
  `Based on what the user said, provide them a recommendation: ${transcript}`,
);
const audioFile:any = await agent.voice.speak(text);

// Convert Node.js ReadableStream to base64
const chunks: Buffer[] = [];
for await (const chunk of audioFile) {
  chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
}
const audioBuffer = Buffer.concat(chunks);
const base64Audio = audioBuffer.toString('base64');

console.log(base64Audio);
 
console.log(`Recommendation: ${text}`);