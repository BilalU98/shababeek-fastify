import { FastifyJWTOptions } from "@fastify/jwt";
import { server } from "core/server";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import User from "../models/User.model";
import { IUser } from "../types/UserType";

interface UserRequest extends RouteGenericInterface {
  Body: IUser;
}

export default async function update(
  req: FastifyRequest<UserRequest>,
  res: FastifyReply
) {
  try {
    const detalis = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthOfDate: req.body.birthOfDate,
      address: req.body.address,
      photo: req.body.photo,
    };

    const authHeader = req.headers.authorization;

    // Check if the authorization header exists and is valid
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400);

      return {
        status: "failed",
        error: "make sure to send Bearer token !",
      };
    }

    const token = authHeader.split(" ")[1];

    const decoded = server.jwt.decode<{ id: string }>(token);

    const updated = await User.findByIdAndUpdate(decoded?.id, detalis, {
      new: true,
      runValidators: true,
    });

    const user = await updated?.save();

    return {
      status: "success",
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
