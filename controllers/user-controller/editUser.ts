import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/user";

const requestBodySchema = z.object({
  fullname: z.string().optional(),
  caste: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
});

let editUser = async (req: Request, res: Response) => {
  try {
    const requestBody = requestBodySchema.parse(req.body);

    const userId = req.params.id;

    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (requestBody.fullname) user.fullname = requestBody.fullname;
    if (requestBody.caste) user.caste = requestBody.caste;
    if (requestBody.email) user.email = requestBody.email;
    if (requestBody.phone) user.phone = requestBody.phone;
    if (requestBody.password) user.password = requestBody.password;
    if (requestBody.dob) user.dob = requestBody.dob;
    if (requestBody.gender) user.gender = requestBody.gender;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default editUser;
