import { z } from 'zod';
import { RoleEnum } from '../enums/roleEnum';

const Roles = Object.values(RoleEnum);

const ContactSchema = z.object({
	_id: z.string(),
	firstName: z.string().min(1, "Invalid First Name"),
	lastName: z.string().min(1, "Invalid Last Name"),
	email: z.string().email("Invalid Email"),
	dateOfBirth: z.string().date("Invalid Date of Birth"),
	contactNumber: z.string().length(10, "Contact Number must have 10 digits").refine(value => /^[6-9]{1}[0-9]{9}$/.test(value), "Invalid Contact Number"),
	role: z.custom((val) => Roles.includes(val), "Invalid Role"),
	address: z.string().min(1, "Invalid Address"),
	joiningDate: z.string().date("Invalid Joining Date"),
	salary: z.string().min(1, "Invalid Salary").refine((value) => /^\d{0,10}(\.\d{0,2})?$/.test(value), "Invalid Salary")
});

export default ContactSchema;