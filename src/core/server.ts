import Fastify from "fastify";
import pino from "pino";
import router from "core/routes";
import multer from "fastify-multer";
import { FastifyJWTOptions } from "@fastify/jwt";
// const upload = multer({ dest: "uploads/" });
const jwtOptions: FastifyJWTOptions = {
  secret: "supersecret",
  sign: {
    expiresIn: 360000000,
  },
};
const server = Fastify({
  logger: pino({ level: "info" }),
});

const connectToServer = async () => {
  // register fastify content parser
  server.register(multer.contentParser);
  server.register(require("@fastify/jwt"), jwtOptions);

  // all app routes
  router.scan(server);

  try {
    const address = await server.listen(3000);
    console.log("Server running on  " + address);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

export { connectToServer, server };
