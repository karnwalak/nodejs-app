import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import User from "../../models/user";
import Matrimony from "../../models/matrimony";

import { z } from "zod";

const requestBodySchema = z.object({
  fullname: z.string(),
  caste: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
  dob: z.string(),
  gender: z.string(),
});

let addUser = async (req: Request, res: Response) => {
  try {
    let requestBody = requestBodySchema.parse(req.body);
    // Check if the email or phone already exists
    const existingUser = await User.findOne({
      $or: [{ email: requestBody.email }, { phone: requestBody.phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }
    let matrimony = await Matrimony.create({});

    let user = await User.create({
      fullname: requestBody.fullname,
      caste: requestBody.caste,
      email: requestBody.email,
      phone: requestBody.phone,
      password: requestBody.password,
      dob: requestBody.dob,
      gender: requestBody.gender,
      matrimony_registered:0,
      matrimony_registration: matrimony._id,
    });

    let token = sign(
      {
        _id: user._id,
      },
      process.env.API_SECRET as string
    );

    return res.status(200).send({
      message: "User created successfully",
      accesstoken: token,
      user: user,
    });
  } catch (e) {
    res.status(500).send(e);
    console.log({ error: e });
  }
};

export default addUser;
