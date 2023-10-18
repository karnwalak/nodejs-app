import { Request, Response } from "express";
import { z } from "zod";
import Matrimony from "../../models/matrimony";
import { sign } from "jsonwebtoken";
import User from "../../models/user";
import FamilyTree from "../../models/familyTree";
import { v2 as cloudinary } from "cloudinary";
import { config as cloudinaryConfig } from "../../utils/cloudinary";
import streamifier from "streamifier";
import multer from "multer";

cloudinary.config(cloudinaryConfig);

// const storage = multer.memoryStorage(); // Store the image in memory
// const upload = multer({ storage: storage });

async function uploadImageToCloudinary(
  file: Buffer,
  folderName: string
): Promise<string> {
  return new Promise<string>((resolve: any, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: "Home/images" },
      function (error, result) {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error);
        } else {
          console.log("Upload successful:", result);
          resolve(result?.secure_url);
        }
      }
    );
    streamifier.createReadStream(file).pipe(cld_upload_stream);
  });
}

let requestBodySchema = z.object({
  user_id: z.string(),
  fullname: z.string(),
  email: z.string().optional(),
  phone: z.string(),
  gender: z.string(),
  dob: z.string(),
  birth_time: z.string(),
  birth_place: z.string(),
  height: z.string(),
  bloodgroup: z.string(),
  highest_education: z.string(),
  village_name: z.string(),
  nadi: z.string(),
  gana: z.string(),
  complexion: z.string(),
  spectacles: z.string(),
  manglik: z.string(),
  weight: z.string(),
  hobbies: z.string(),
  address: z.string(),
  // family_tree: z.array(
  //   z.object({
  //     image: z.string(),
  //     fullname: z.string(),
  //   })
  // ),
});

let addMatrimony = async (req: Request, res: Response) => {
  try {
    // console.log("result=======================>", req.body);
    let requestBody = requestBodySchema.parse(req.body);

    let user_id = requestBody.user_id;

    let user = await User.findById(user_id);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Cannot find user,check user id" });
    }

    // const familyTree = requestBody?.family_tree?.map((member: any) => ({
    //   image: member.image,
    //   fullname: member.fullname,
    // }));

    // console.log("familyTree=================>", familyTree);

    const familyDetailsRequest = req.body.family_details;

    const familyDetails = {
      father_name: familyDetailsRequest.father_name,
      occupation: familyDetailsRequest.occupation,
      annual_income: familyDetailsRequest.annual_income,
      phone: familyDetailsRequest.phone,
      sister_marriage_status: familyDetailsRequest.sister_marriage_status,
      brother_marriage_status: familyDetailsRequest.brother_marriage_status,
      family_type: familyDetailsRequest.family_type,
    };

    const professionalDetailsReq = req.body.proffessional_details;

    const professionalDetails = {
      occupation: professionalDetailsReq.occupation,
      industry: professionalDetailsReq.industry,
      annual_income: professionalDetailsReq.annual_income,
    };

    // Check if the email or phone already exists
    const existingUser = await Matrimony.findOne({
      $or: [{ email: requestBody.email }, { phone: requestBody.phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

    const imageBuffer: any = req.file?.buffer;
    const cloudinaryFolderName = "your-folder-name";
    const imageUrl = await uploadImageToCloudinary(
      imageBuffer,
      cloudinaryFolderName
    );

    console.log(
      "imageurl===========================================>",
      req.body.family_details
    );

    let matrimonyUser = new Matrimony({
      fullname: requestBody.fullname,
      profile_image: imageUrl,
      email: requestBody.email,
      phone: requestBody.phone,
      gender: requestBody.gender,
      dob: requestBody.dob,
      birth_time: requestBody.birth_time,
      birth_place: requestBody.birth_place,
      height: requestBody.height,
      bloodgroup: requestBody.bloodgroup,
      highest_education: requestBody.highest_education,
      village_name: requestBody.village_name,
      nadi: requestBody.nadi,
      gana: requestBody.gana,
      complexion: requestBody.complexion,
      spectacles: requestBody.spectacles,
      manglik: requestBody.manglik,
      weight: requestBody.weight,
      hobbies: requestBody.hobbies,
      address: requestBody.address,
      family_details: familyDetails,
      proffessional_details: professionalDetails,
    });

    await matrimonyUser.save();

    user.matrimony_registration = matrimonyUser._id;
    user.matrimony_registered = 1;

    await user.save();

    const populatedUser = await User.findById(user_id).populate(
      "matrimony_registration"
    );

    // let family = new FamilyTree({
    //   familyTree,
    // });

    // await family.save();

    res.status(200).send({
      message: "Matrimony profile created successfully",
      user: populatedUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default addMatrimony;
