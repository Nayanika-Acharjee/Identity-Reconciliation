const mongoose = require("mongoose");

const ContactSchema= new mongoose.Schema(
    {
  email: {
    type: String,
    default: null
},
phoneNumber : {
    type: String,
    default : null
},
linkedId : {
type: mongoose.Schema.Types.ObjectId,
default : null
},
linkPrecedence : {
 type : String,
 enum : ["primary","secondary"],
 required : true
}
 },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);



  