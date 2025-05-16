import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { emergencyorchestrator } from './agents';
import { registerApiRoute } from '@mastra/core/server';
import { speakAgent } from '../../handlers/speak';
// import {agent}

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { emergencyorchestrator },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  server: {
    apiRoutes: [
      registerApiRoute("/speaks/:text", {
        method: "GET",
        handler: async(c) => {
          const text:any = c.req.param('text')
          const mastra = c.get("mastra");
          const agent = mastra.getAgent('emergencyorchestrator');
          const audioFile:any = await agent.voice.speak("Hello")
          console.log(audioFile)
          // Convert Node.js ReadableStream to base64
          // const chunks: Buffer[] = [];
          // for await (const chunk of audioFile) {
          //   chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          // }
          // const audioBuffer = Buffer.concat(chunks);
          // const base64Audio = audioBuffer.toString('base64');
          // console.log(base64Audio)
          return c.json({ message: "Success" });
        }
      })
    ]
  }
}); 