# Chromatic Pipeline

[![deno module](https://shield.deno.dev/x/chromatic_pipeline)](https://deno.land/x/chromatic_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/chromatic-pipeline)](https://codecov.io/gh/fluent-ci-templates/chromatic-pipeline)

A ready-to-use CI/CD Pipeline for your [Chromatic](https://www.chromatic.com/) Projects. Publishes your Storybook to Chromatic and kicks off tests if they're enabled.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci chromatic_pipeline
```

## Environment Variables

| Variable                | Description                   |
|-------------------------|-------------------------------|
| CHROMATIC_PROJECT_TOKEN | Your Chromatic Project Token. |

## Jobs

| Job     | Description                            |
|---------|----------------------------------------|
| publish | Publishes your Storybook to Chromatic. |

## Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { Client, connect } from "@dagger.io/dagger";
import { Dagger } from "https://deno.land/x/chromatic_pipeline/mod.ts";

const { publish} = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await publish(client, src);
  });
}

pipeline();

```