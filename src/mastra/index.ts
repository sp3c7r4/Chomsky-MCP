import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { emergencyOrchestrator } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { emergencyOrchestrator },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
}); 