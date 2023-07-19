import { server } from "core/server";
import { FastifyReply, FastifyRequest } from "fastify";
import User from "../models/User.model";

export async function details(req: FastifyRequest, res: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and is valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400);

      return {
        status: "failed",
        error: "make sure to send Bearer token !",
      };
    }

    const sentToken = authHeader.split(" ")[1];

    const decoded = server.jwt.decode<{ id: string }>(sentToken);

    const user = await User.findById(decoded?.id);

    const token = server.jwt.sign({ id: user?._id });

    return {
      status: "success",
      token,
      data: user,
    };
  } catch (e) {
    console.log({ e });
    res.status(500);
    return {
      status: "failed",
      error: e,
    };
  }
}
