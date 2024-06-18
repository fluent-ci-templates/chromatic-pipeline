# Chromatic Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/chromatic_pipeline)](https://pkg.fluentci.io/chromatic_pipeline)
[![deno module](https://shield.deno.dev/x/chromatic_pipeline)](https://deno.land/x/chromatic_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/chromatic)](https://jsr.io/@fluentci/chromatic)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/chromatic-pipeline)](https://codecov.io/gh/fluent-ci-templates/chromatic-pipeline)
[![ci](https://github.com/fluent-ci-templates/chromatic-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/chromatic-pipeline/actions/workflows/ci.yml)

A ready-to-use CI/CD Pipeline for your [Chromatic](https://chromatic.com/) Projects. Publishes your Storybook to Chromatic and kicks off tests if they're enabled.

## 🚀 Usage

Run the following command:

```bash
fluentci run chromatic_pipeline
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger install github.com/fluent-ci-templates/chromatic-pipeline@main
```

Call `publish` function from this module:

```bash
dagger call publish --src . --token CHROMATIC_PROJECT_TOKEN
```

## 🛠️ Environment Variables

| Variable                | Description                                         |
|-------------------------|-----------------------------------------------------|
| CHROMATIC_PROJECT_TOKEN | Your Chromatic Project Token.                       |
| CHROMATIC_VERSION       | The version of Chromatic CLI. Defaults to `latest`. |

## ✨ Jobs

| Job     | Description                            |
|---------|----------------------------------------|
| publish | Publishes your Storybook to Chromatic. |

```typescript
publish(
  src: string | Directory,
  token: string | Secret
): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { publish } from "jsr:@fluentci/chromatic";

await publish(".", Deno.env.get("CHROMATIC_PROJECT_TOKEN")!);

```
