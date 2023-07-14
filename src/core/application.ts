import Fastify from "fastify";
import pino from "pino";
import router from "./routes";

export default async function startApplication() {
  const server = Fastify({
    logger: pino({ level: "info" }),
  });

  router.scan(server);

  try {
    const address = await server.listen(3000);
    console.log("Server running on  " + address);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
