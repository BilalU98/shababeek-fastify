import User from "../models/User.model";
import { FastifyRequest, FastifyReply } from "fastify";

export default async function allUsers(req: FastifyRequest, res: FastifyReply) {
  try {
    const users = await User.find({});

    return {
      status: "success",
      count: users.length,
      data: users,
    };
  } catch (error) {
    console.log({ error });

    res.status(500);
    return {
      status: "failed",
      error,
    };
  }
}
