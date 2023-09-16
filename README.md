# Chromatic Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fchromatic_pipeline&query=%24.version)](https://pkg.fluentci.io/chromatic_pipeline)
[![deno module](https://shield.deno.dev/x/chromatic_pipeline)](https://deno.land/x/chromatic_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/chromatic-pipeline)](https://codecov.io/gh/fluent-ci-templates/chromatic-pipeline)

A ready-to-use CI/CD Pipeline for your [Chromatic](https://chromatic.com/) Projects. Publishes your Storybook to Chromatic and kicks off tests if they're enabled.

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
import Client, { connect } from "https://sdk.fluentci.io/v0.1.7/mod.ts";
import { publish } from "https://pkg.fluentci.io/chromatic_pipeline@v0.5.0/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await publish(client, src);
  });
}

pipeline();

```
