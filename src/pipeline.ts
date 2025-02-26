import * as jobs from "./jobs.ts";
import { env } from "../deps.ts";

const { publish, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await publish(src, env.get("CHROMATIC_PROJECT_TOKEN") || "");
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(".", env.get("CHROMATIC_PROJECT_TOKEN") || "");
  }
}
