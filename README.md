# Chromatic Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fchromatic_pipeline&query=%24.version)](https://pkg.fluentci.io/chromatic_pipeline)
[![deno module](https://shield.deno.dev/x/chromatic_pipeline)](https://deno.land/x/chromatic_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF&labelColor=000000)](https://dagger.io)
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
