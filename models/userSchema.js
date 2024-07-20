import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},
{
    timestamps:true,
}
);

export default mongoose.model("User", UserSchema);