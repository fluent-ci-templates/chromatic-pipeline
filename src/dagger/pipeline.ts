import { uploadContext } from "../../deps.ts";
import * as jobs from "./jobs.ts";

const { publish, runnableJobs, exclude } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (Deno.env.has("FLUENTCI_SESSION_ID")) {
    await uploadContext(src, exclude);
  }
  if (args.length > 0) {
    await runSpecificJobs(args as jobs.Job[]);
    return;
  }

  await publish(src, Deno.env.get("CHROMATIC_PROJECT_TOKEN") || "");
}

async function runSpecificJobs(args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(".", Deno.env.get("CHROMATIC_PROJECT_TOKEN") || "");
  }
}
