import mongoose, { Schema, SchemaTypes } from "mongoose";

let matrimonySchema = new Schema({
  fullname: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  profile_image: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String
  },
  dob: {
    type: String,
  },
  birth_time: {
    type: String,
  },
  birth_place: {
    type: String,
  },
  height: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  highest_education: {
    type: String,
  },
  village_name: {
    type: String,
  },
  nakshatra: {
    type: String,
  },
  nadi: {
    type: String,
  },
  gana: {
    type: String,
  },
  phone: {
    type: String,
    maxlength: 10,
  },
  complexion: {
    type: String,
  },
  spectacles: {
    type: String,
  },
  manglik: {
    type: String,
  },
  weight: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  address: {
    type: String,
  },
  family_details: {
    father_name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    annual_income: {
      type: String,
    },
    phone: {
      type: String,
      maxlength: 20,
    },
    sister_marriage_status: {
      type: String,
    },
    brother_marriage_status: {
      type: String,
    },
    family_type: {
      type: String, //joint family or nuclear family
    },
  },
  proffessional_details: {
    occupation: {
      type: String,
    },
    industry: {
      type: String,
    },
    annual_income: {
      type: String,
    },
  },
  partner_preferences: {
    type: String,
  },
  cast: {
    type: String,
  },
  sub_cast: {
    type: String,
  },
  link: {
    type: String,
  },
  marital_status: {
    type: String,
  },
  comments: [
    {
      type: String,
    },
  ],
  like: [
    {
      user: {
        type: String,
      },
    },
  ],
  family_tree: [
    {
      type: SchemaTypes.ObjectId,
      ref: "FamilyTree",
    },
  ],
});

let Matrimony = mongoose.model("Matrimony", matrimonySchema);

export default Matrimony;
