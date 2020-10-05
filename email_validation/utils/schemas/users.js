//This script is used to model the standard schema for Users. 
//It´s the first script of the diagram flow.
//Where should I use the credentianls for MongoDB access?
var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },    //This flag is essential for E-mail verification
  roles: [{ type: 'String' }],
  isVerified: { type: Boolean, default: false },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date
}, schemaOptions);