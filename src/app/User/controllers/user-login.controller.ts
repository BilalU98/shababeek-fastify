import { server } from "core/server";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";

import User from "../models/User.model";
import { IUser } from "../types/UserType";

interface UserRequest extends RouteGenericInterface {
  Body: IUser;
}

export default async function login(
  req: FastifyRequest<UserRequest>,
  res: FastifyReply
) {
  try {
    const { password, phone } = req.body;

    if (!phone || !password) {
      res.status(400);
      return {
        status: "failed",
        message: "provide phone and password",
      };
    }

    const user = await User.findOne({ phone });

    // check if password match and user is already existing
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400);

      return {
        status: "failed",
        message: "phone number or password is wrong !",
      };
    }

    const token = await server.jwt.sign({ id: user._id });

    return {
      status: "success",
      token,
      data: user,
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
