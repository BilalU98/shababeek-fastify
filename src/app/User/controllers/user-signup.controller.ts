import { server } from "core/server";
import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import User from "../models/User.model";
import { IUser } from "../types/UserType";

interface UserRequest extends RouteGenericInterface {
  Body: IUser;
}

export default async function signup(
  req: FastifyRequest<UserRequest>,
  res: FastifyReply
) {
  try {
    // create new user
    const detalis = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      phone: req.body?.phone,
      birthOfDate: req.body?.birthOfDate,
      address: req.body?.address,
      photo: req.body?.photo,
      password: req.body?.password,
    };

    if (!detalis?.phone || !detalis?.password) {
      res.status(400);
      return {
        status: "failed",
        message: "provide phone number and password",
      };
    }

    const isExsit = await User.findOne({ phone: detalis.phone });
    if (isExsit) {
      res.status(400);
      return {
        status: "failed",
        message: "user already exist, try another one !",
      };
    }
    const user = await User.create(detalis);

    let token = "";
    if (user) {
      token = await server.jwt.sign({ id: user._id });
    }

    res.status(200);
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
