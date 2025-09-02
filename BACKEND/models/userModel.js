import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

      "Please enter a valid email",
    ]
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    minLength: [6, "Password must be up to 6 characters"],
    //maxLength: [23, "Password must not be more than 23 characters"]
  },
  photo:{
    type: String,
    required: [true, "Please enter a photo"],
    default: "https://cdn.pixabay.com/photo/2014/04/03/10/44/avatar-311292_1280.png"
  },
  phone:{
    type: String,
    default: "+254"
  },
  bio:{
    type: String,
    default: "bio",
    maxLength: [250, "Bio must not be more than 250 characters"]
  }
}, {
    timestamps: true
});
  //encrypt password before saving to DB

  userSchema.pre("save", async function(next) {
      if(!this.isModified("password")){
        return next()
      }
    //hashing  all password 
    
    const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(this.password, salt)
     this.password = hashedPassword
      next()

  })
const User = mongoose.model("User", userSchema);


export default User;
