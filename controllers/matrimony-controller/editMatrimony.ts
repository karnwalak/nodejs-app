import { Request, Response } from "express";
import Matrimony from "../../models/matrimony";
import { z } from "zod";

const requestBodySchema = z.object({
  fullname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
  birth_time: z.string().optional(),
  birth_place: z.string().optional(),
  height: z.string().optional(),
  bloodgroup: z.string().optional(),
  highest_education: z.string().optional(),
  village_name: z.string().optional(),
  nadi: z.string().optional(),
  gana: z.string().optional(),
  complexion: z.string().optional(),
  spectacles: z.string().optional(),
  manglik: z.string().optional(),
  weight: z.string().optional(),
  hobbies: z.string().optional(),
  address: z.string().optional(),
});

const editMatrimony = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const requestBody = requestBodySchema.parse(req.body);

    const matrimony_user = await Matrimony.findById({ _id: userId });

    if (!matrimony_user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (requestBody.fullname) matrimony_user.fullname = requestBody.fullname;
    if (requestBody.email) matrimony_user.email = requestBody.email;
    if (requestBody.phone) matrimony_user.phone = requestBody.phone;
    if (requestBody.dob) matrimony_user.dob = requestBody.dob;
    if (requestBody.gender) matrimony_user.gender = requestBody.gender;

    // Familty details update
    matrimony_user.family_details = matrimony_user.family_details || {};
    // Ensure family_details is an object
    if (req.body["family_details[father_name]"]) {
      matrimony_user.family_details.father_name =
        req.body["family_details[father_name]"];
    }
    if (req.body["family_details[occupation]"]) {
      matrimony_user.family_details.occupation =
        req.body["family_details[occupation]"];
    }
    if (req.body["family_details[annual_income]"]) {
      matrimony_user.family_details.annual_income =
        req.body["family_details[annual_income]"];
    }
    if (req.body["family_details[phone]"]) {
      matrimony_user.family_details.phone = req.body["family_details[phone]"];
    }
    if (req.body["family_details[sister_marriage_status]"]) {
      matrimony_user.family_details.sister_marriage_status =
        req.body["family_details[sister_marriage_status]"];
    }
    if (req.body["family_details[brother_marriage_status]"]) {
      matrimony_user.family_details.brother_marriage_status =
        req.body["family_details[brother_marriage_status]"];
    }
    if (req.body["family_details[family_type]"]) {
      matrimony_user.family_details.family_type =
        req.body["family_details[family_type]"];
    }

    // professional details update

    matrimony_user.proffessional_details =
      matrimony_user.proffessional_details || {};

    if (req.body["proffessional_details[occupation]"]) {
      matrimony_user.proffessional_details.occupation =
        req.body["proffessional_details[occupation]"];
    }
    if (req.body["proffessional_details[industry]"]) {
      matrimony_user.proffessional_details.industry =
        req.body["proffessional_details[industry]"];
    }
    if (req.body["proffessional_details[annual_income]"]) {
      matrimony_user.proffessional_details.annual_income =
        req.body["proffessional_details[annual_income]"];
    }

    console.log(
      "OUTPUT++++++++++++++++++++++++++++++++++++++++++++++++>",
      matrimony_user.family_details
    );

    await matrimony_user.save();

    res
      .status(200)
      .json({ message: "Matrimony User updated successfully", matrimony_user });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default editMatrimony;
