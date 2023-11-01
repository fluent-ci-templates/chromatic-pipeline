import Client, { connect } from "../../deps.ts";

export enum Job {
  publish = "publish",
}

export const exclude = [".devbox", "node_modules", ".fluentci"];

export const publish = async (src = ".", token?: string) => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const VERSION = Deno.env.get("CHROMATIC_VERSION") || "latest";

    if (!Deno.env.get("CHROMATIC_PROJECT_TOKEN") && !token) {
      throw new Error("CHROMATIC_PROJECT_TOKEN is not set");
    }

    const ctr = client
      .pipeline(Job.publish)
      .container()
      .from("ghcr.io/fluentci-io/pkgx:latest")
      .withExec(["apt-get", "update"])
      .withExec(["apt-get", "install", "-y", "build-essential"])
      .withExec([
        "pkgx",
        "install",
        "node@18",
        "bun",
        "git",
        "classic.yarnpkg.com",
      ])
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
      .withExec(["yarn", "install"])
      .withExec(["bunx", `chromatic@${VERSION}`, "--exit-zero-on-changes"]);

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
