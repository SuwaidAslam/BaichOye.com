import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

export const User = mongoose.model('User2', userSchema);

export const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		phone: Joi.string().pattern(new RegExp('^((\\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$')).messages({'string.pattern.base': `Phone number is not Valid`}).required().label("Phone"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};