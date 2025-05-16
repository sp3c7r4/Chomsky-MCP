import { emergencyorchestrator } from "../src/mastra/agents";

export async function speakAgent(text) {
  const speak = emergencyorchestrator.voice.speak(text)  
  console.log(speak)
  return;
}