import Client, { Directory, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, getChromaticToken } from "./lib.ts";

export enum Job {
  publish = "publish",
}

export const exclude = [".devbox", "node_modules", ".fluentci"];

/**
 * @function
 * @description Publish storybook to Chromatic
 * @param {string | Directory} src
 * @param {string | Secret} token
 * @returns {string}
 */
export async function publish(
  src: string | Directory,
  token: string | Secret
): Promise<string> {
  await connect(async (client: Client) => {
    const context = await getDirectory(client, src);
    const VERSION = Deno.env.get("CHROMATIC_VERSION") || "latest";
    const secret = await getChromaticToken(client, token);

    if (!secret) {
      console.error("CHROMATIC_PROJECT_TOKEN is not set");
      Deno.exit(1);
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
      .withSecretVariable("CHROMATIC_PROJECT_TOKEN", secret)
      .withExec(["yarn", "install"])
      .withExec(["bunx", `chromatic@${VERSION}`, "--exit-zero-on-changes"]);

    await ctr.stdout();
  });
  return "Done";
}

export type JobExec = (
  src: string | Directory,
  token: string | Secret
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.publish]: publish,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.publish]: "Publish storybook to Chromatic",
};
