import * as yup from 'yup';
import { RoleEnum } from '../enums/roleEnum';
import { parse } from 'date-fns/parse';

const AddContactSchema = yup.object({
	_id: yup.string(),
	firstName: yup.string().min(1).required("First Name is Required"),
	lastName: yup.string().min(1).required("Last Name is Required"),
	email: yup.string().email("Invalid Email").required("Email Id is Required"),
	dateOfBirth: yup.date().transform(function (value, originalValue) {
		if (this.isType(value)) return value;
		return parse(originalValue, "dd.MM.yyyy", new Date());
	}).typeError("Invalid Date of Birth").required("Date of Birth is Required"),
	contactNumber: yup.string().length(10, "Contact Number must have 10 digits").matches(/^[6-9]\d{9}$/, "Invalid Contact Number"),
	role: yup.mixed<RoleEnum>().oneOf(Object.values(RoleEnum)),
	address: yup.string().min(1).required("Address is Required"),
	joiningDate: yup.date().transform(function (value, originalValue) {
		if (this.isType(value)) return value;
		return parse(originalValue, "dd.MM.yyyy", new Date());
	}).typeError("Invalid Joining Date").required("Joining Date is Required"),
	salary: yup.string().matches(/^\d{0,10}(\.\d{0,2})?$/, "Salary must be a valid number")
});

export { AddContactSchema };