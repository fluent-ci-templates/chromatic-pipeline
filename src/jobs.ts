/**
 * @module chromatic
 * @description Deploy storybook to Chromatic
 */

import { dag, Directory, env, exit, Secret } from "../deps.ts";
import { getChromaticToken, getDirectory } from "./helpers.ts";

export enum Job {
  publish = "publish",
}

export const exclude = [".devbox", "node_modules", ".fluentci"];

/**
 * Publish storybook to Chromatic
 *
 * @function
 * @description Publish storybook to Chromatic
 * @param {string | Directory} src
 * @param {string | Secret} token
 * @returns {string}
 */
export async function publish(
  src: string | Directory,
  token: string | Secret,
): Promise<string> {
  const context = await getDirectory(src);
  const VERSION = env.get("CHROMATIC_VERSION") || "latest";
  const secret = await getChromaticToken(token);

  if (!secret) {
    console.error("CHROMATIC_PROJECT_TOKEN is not set");
    exit(1);
    return "";
  }

  const ctr = dag
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
    .withMountedCache("/root/.bun/install/cache", dag.cacheVolume("bun-cache"))
    .withMountedCache("/app/node_modules", dag.cacheVolume("node_modules"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withSecretVariable("CHROMATIC_PROJECT_TOKEN", secret)
    .withExec(["bun", "install"])
    .withExec(["bunx", `chromatic@${VERSION}`, "--exit-zero-on-changes"]);

  return ctr.stdout();
}

export type JobExec = (
  src: string | Directory,
  token: string | Secret,
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.publish]: publish,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.publish]: "Publish storybook to Chromatic",
};
