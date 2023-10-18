import { Request, Response } from "express";
import Matrimony from "../../models/matrimony";

const likeMatrimony = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    console.log(userId);
    
    // const user = await Matrimony.findById({ _id: userId });

    const likeArray = [];

    for (const key in req.body) {
      if (key.startsWith('like[') && key.endsWith('][user]')) {
        // Extract the user ID from the key and add it to the likeArray
        const userId = req.body[key];
        likeArray.push({ user: userId });
      }
    }

    const matrimonyToUpdate = await Matrimony.findOne({ _id: userId })

    if (!matrimonyToUpdate) {
      return res.status(404).json({ message: "Matrimony user not found" });
    }

    if (likeArray.length > 0) {

      matrimonyToUpdate.like = likeArray;
      await matrimonyToUpdate.save();
    }
    
    console.log('User IDs from form data:', likeArray);

    res.status(200).send({ message: "success", data: matrimonyToUpdate });


  } catch (error) {}
};

export default likeMatrimony;
