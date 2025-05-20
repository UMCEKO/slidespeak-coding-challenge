import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const processEnv = {
  NEXT_PUBLIC_API_URL: process.env['NEXT_PUBLIC_API_URL'],
};

const env = EnvSchema.parse(processEnv);

export default env;
