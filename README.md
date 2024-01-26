# Chromatic Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fchromatic_pipeline&query=%24.version)](https://pkg.fluentci.io/chromatic_pipeline)
[![deno module](https://shield.deno.dev/x/chromatic_pipeline)](https://deno.land/x/chromatic_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/chromatic-pipeline)](https://codecov.io/gh/fluent-ci-templates/chromatic-pipeline)

A ready-to-use CI/CD Pipeline for your [Chromatic](https://chromatic.com/) Projects. Publishes your Storybook to Chromatic and kicks off tests if they're enabled.

## 🚀 Usage

Run the following command:

```bash
fluentci run chromatic_pipeline
```

## Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger mod install github.com/fluent-ci-templates/chromatic-pipeline@mod
```

## Environment Variables

| Variable                | Description                                         |
|-------------------------|-----------------------------------------------------|
| CHROMATIC_PROJECT_TOKEN | Your Chromatic Project Token.                       |
| CHROMATIC_VERSION       | The version of Chromatic CLI. Defaults to `latest`. |

## Jobs

| Job     | Description                            |
|---------|----------------------------------------|
| publish | Publishes your Storybook to Chromatic. |

```typescript
publish(
  src: string | Directory,
  token: string | Secret
): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { publish } from "https://pkg.fluentci.io/chromatic_pipeline@v0.9.3/mod.ts";

await publish(".", Deno.env.get("CHROMATIC_PROJECT_TOKEN")!);

```
