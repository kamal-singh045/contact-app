import mongoose from "mongoose";
import { RoleEnum } from "../enums/roleEnum";

const contactsSchema = new mongoose.Schema({
	firstName: {
		type: String,
		requried: true,
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	dateOfBirth: {
		type: String,
		required: true
	},
	contactNumber: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		enum: RoleEnum
	},
	address: {
		type: String,
		required: true
	},
	joiningDate: {
		type: String,
		required: true
	},
	salary: {
		type: String,
		required: true
	}
});

const contactsModel = mongoose.model("contacts", contactsSchema);
export default contactsModel;