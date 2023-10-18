import { Schema } from "mongoose";

let familyTreeSchema = new Schema({
  image: String,
  full_name: String,
});

let FamilyTree = mongoose.model("FamilyTree", familyTreeSchema);

export default FamilyTree;
