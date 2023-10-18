import { Request, Response } from "express";
import User from "../../models/user";
import { z } from "zod";
import jwt from "jsonwebtoken";

let requestBodySchema = z.object({
  email: z.string().email().optional(),
  phone: z.string(),
  otp: z.string(),
});

let login = async (req: Request, res: Response) => {
  try {
    let requestBody = requestBodySchema.parse(req.body);

    const user = await User.findOne({
      $or: [{ email: requestBody.email }, { phone: requestBody.phone }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (requestBody.otp !== "1234") {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    var token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.API_SECRET as string,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).json({ message: "Login successful",accessToken:token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default login;
