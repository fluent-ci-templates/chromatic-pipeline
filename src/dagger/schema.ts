import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { publish } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("publish", {
      args: {
        src: stringArg(),
        token: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await publish(args.src || undefined, args.token),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "publish.src": "directory",
});

export { schema };
