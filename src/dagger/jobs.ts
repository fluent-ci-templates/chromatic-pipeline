import Client, { CacheSharingMode, connect } from "../../deps.ts";

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
      .from("ghcr.io/fluentci-io/bun:latest")
      .withExec(["mv", "/nix/store", "/nix/store-orig"])
      .withMountedCache("/nix/store", client.cacheVolume("nix-cache"), {
        sharing: CacheSharingMode.Shared,
      })
      .withExec(["sh", "-c", "cp -r /nix/store-orig/* /nix/store/"])
      .withMountedCache(
        "/root/.bun/install/cache",
        client.cacheVolume("bun-cache")
      )
      .withMountedCache("/app/node_modules", client.cacheVolume("node_modules"))
      .withEnvVariable("NIX_INSTALLER_NO_CHANNEL_ADD", "1")
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withEnvVariable(
        "CHROMATIC_PROJECT_TOKEN",
        Deno.env.get("CHROMATIC_PROJECT_TOKEN") || token!
      )
      .withExec(["sh", "-c", "devbox global run -- bun install"])
      .withExec(["sh", "-c", "devbox global run -- bun x chromatic"]);

    const result = await ctr.stdout();

    console.log(result);
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
