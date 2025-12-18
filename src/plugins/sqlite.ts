// import fp from "fastify-plugin";
// import Database from "better-sqlite3";

// interface FastifySqliteOptions {
//   filename?: string;
//   verbose?: (...args: any[]) => void;
// }

// async function fastifySqlite(
//   fastify: any,
//   options: FastifySqliteOptions
// ) {
//   const db = new Database(options.filename??"", {
//     verbose: options.verbose,
//   });

//   if (!fastify.sqlite) {
//     fastify.decorate("sqlite", db);
//   }

//   fastify.addHook("onClose", async () => {
//     db.close();
//   });
// }

// export default fp(fastifySqlite, {
//   name: "fastify-sqlite",
// });


import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import Database from "better-sqlite3";

interface SqliteOptions {
  filename?: string;
}

async function sqlitePlugin(
  fastify: FastifyInstance,
  options: SqliteOptions
) {
  const db = new Database(options.filename ?? "app.db");

  fastify.decorate("sqlite", db);

  fastify.addHook("onClose", async () => {
    db.close();
  });
}

export default fp(sqlitePlugin, {
  name: "fastify-sqlite",
});
