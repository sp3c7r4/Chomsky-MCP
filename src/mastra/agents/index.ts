import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';
import { DeepgramVoice } from '@mastra/voice-deepgram';
import { ElevenLabsVoice } from "@mastra/voice-elevenlabs";

// const voice = new DeepgramVoice({
//   speechModel: {
//     name: 'aura',
//     apiKey: process.env.DEEPGRAM_API_KEY ,
//   },
//   listeningModel: {
//     name: 'nova-2',
//     apiKey: process.env.DEEPGRAM_API_KEY,
//   },
//   speaker: "asteria-en",
// });
const voice = new ElevenLabsVoice()

export const emergencyorchestrator = new Agent({
  name: 'Emergency Orchestrator',
  instructions: `
      You are responsible for managing emergency response workflows.
      Coordinate between tools to classify the emergency, verify location,
      allocate resources, notify services, and log the interaction.
      For casual conversations, provide appropriate responses.
`,
  model: google('gemini-2.0-flash-001'),
  tools: { weatherTool },
  voice
});

// const audioStream = await emergencyOrchestrator.voice.speak("Hello, world!");
 
// // Speech-to-Text
// const transcript = await emergencyOrchestrator.voice.listen(audioStream);
// console.log(transcript)
// const { text } = await emergencyOrchestrator.generate('What color is the sky?');
 
// // Convert text to speech to an Audio Stream
// const audioStream = await emergencyOrchestrator.voice.speak(text, {
// speaker: "aura-english-us", // Optional: specify a speaker
// });
 
// playAudio(audioStream);