import Client, { connect } from "../../deps.ts";

export enum Job {
  publish = "publish",
}

export const exclude = [".git", ".devbox", "node_modules", ".fluentci"];

export const publish = async (src = ".", token?: string) => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);

    if (!Deno.env.get("CHROMATIC_PROJECT_TOKEN") && !token) {
      throw new Error("CHROMATIC_PROJECT_TOKEN is not set");
    }

    const ctr = client
      .pipeline(Job.publish)
      .container()
      .from("ghcr.io/fluentci-io/pkgx:latest")
      .withExec(["pkgx", "install", "node@18", "bun"])
      .withMountedCache(
        "/root/.bun/install/cache",
        client.cacheVolume("bun-cache")
      )
      .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withEnvVariable(
        "CHROMATIC_PROJECT_TOKEN",
        Deno.env.get("CHROMATIC_PROJECT_TOKEN") || token!
      )
      .withExec(["bun", "install"])
      .withExec(["bunx", "chromatic"]);

    await ctr.stdout();
  });
  return "Done";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.publish]: publish,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.publish]: "Publish storybook to Chromatic",
};
