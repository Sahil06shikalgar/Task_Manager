const mangoose = require("mongoose");

const UserSchema=new mangoose.Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true,unique:true },
    profileImageUrl:{ type:String, default:"" },
    role:{ type:String, enum:["admin","member"], default:"member" },   
},
{ timestamps:true }
)

module.exports = mangoose.model("User", UserSchema);