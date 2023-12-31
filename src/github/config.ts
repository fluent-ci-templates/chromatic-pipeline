import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml(): Workflow {
  const workflow = new Workflow("Publish");

  const push = {
    branches: ["main"],
  };

  const setupDagger = `\
  curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.9.3 sh
  sudo mv bin/dagger /usr/local/bin
  dagger version`;

  const publish: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        uses: "denoland/setup-deno@v1",
        with: {
          "deno-version": "v1.37",
        },
      },
      {
        name: "Setup Fluent CI CLI",
        run: "deno install -A -r https://cli.fluentci.io -n fluentci",
      },
      {
        name: "Setup Dagger",
        run: setupDagger,
      },
      {
        name: "Run Dagger Pipelines",
        run: "dagger run fluentci chromatic_pipeline",
        env: {
          CHROMATIC_PROJECT_TOKEN: "${{ secrets.CHROMATIC_PROJECT_TOKEN }}",
        },
      },
    ],
  };

  workflow.on({ push }).jobs({ publish });

  return workflow;
}
