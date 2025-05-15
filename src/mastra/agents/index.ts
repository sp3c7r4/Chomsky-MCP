import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';
import { DeepgramVoice } from '@mastra/voice-deepgram';
import { CompositeVoice } from '@mastra/core/voice';
import { playAudio } from '@mastra/node-audio';

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

export const emergencyOrchestrator = new Agent({
  name: 'Emergency Orchestrator',
  instructions: `
      You are responsible for managing emergency response workflows.
      Coordinate between tools to classify the emergency, verify location,
      allocate resources, notify services, and log the interaction.
      For casual conversations, provide appropriate responses.
`,
  model: google('gemini-2.5-pro-exp-03-25'),
  tools: { weatherTool },
  voice: new DeepgramVoice()
});

const { text } = await emergencyOrchestrator.generate('What color is the sky?');
 
// Convert text to speech to an Audio Stream
const audioStream = await emergencyOrchestrator.voice.speak(text, {
speaker: "aura-english-us", // Optional: specify a speaker
});
 
// playAudio(audioStream);