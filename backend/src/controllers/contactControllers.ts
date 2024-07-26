import { RequestHandler } from "express";
import contactsModel from "../models/contactsModel";
import { StatusCodeEnum } from "../enums/statusCodeEnum";
import { RoleEnum } from "../enums/roleEnum";
import { AddContactSchema, UpdateContactSchema } from "../validators/contactValidation";

class ContactControllers {
	addContactController: RequestHandler = async (req, res, next) => {
		try {
			const validatedData = await AddContactSchema.validate(req.body).catch(err => err);
			if (validatedData.errors && validatedData.errors.length) return res.status(StatusCodeEnum.FORBIDDEN).send({ success: false, message: validatedData.errors[0] });

			const alreadyExists = await contactsModel.findOne({ email: req.body.email });
			if (alreadyExists) return res.status(StatusCodeEnum.CONFLICT).send({ success: false, message: "Email Already Exists." });
			const newUserData = { ...req.body };
			delete newUserData._id; //default empty id is coming from frontend, so first remove it.
			await contactsModel.create(newUserData);
			return res.status(StatusCodeEnum.CREATED).send({ success: true, message: "Contact is Created" });
		} catch (error) {
			console.log(error);
			next();
		}
	}

	deleteContactController: RequestHandler = async (req, res, next) => {
		try {
			const idToDelete = req.query.id;
			const checkExists = await contactsModel.findOne({ _id: idToDelete });
			if (!checkExists) return res.status(StatusCodeEnum.NOT_FOUND).send({ success: false, message: "Contact does not exists" });

			await contactsModel.findByIdAndDelete(idToDelete);
			return res.status(StatusCodeEnum.OK).send({ success: true, message: "Contact deleted Successfully." });
		} catch (error) {
			next();
		}
	}

	updateContactController: RequestHandler = async (req, res, next) => {
		try {
			const validatedData = await UpdateContactSchema.validate({ query: req.query, body: req.body }).catch(err => err);
			if (validatedData.errors && validatedData.errors.length) return res.status(StatusCodeEnum.FORBIDDEN).send({ success: false, message: validatedData.errors[0] });

			const idToUpdate = req.query.id;
			const checkExists = await contactsModel.findOne({ _id: idToUpdate });
			if (!checkExists) return res.status(StatusCodeEnum.NOT_FOUND).send({ success: false, message: "Contact does not exists" });

			await contactsModel.findByIdAndUpdate(idToUpdate, { $set: req.body });
			return res.status(StatusCodeEnum.OK).send({ success: true, message: "Contact updated Successfully." });
		} catch (error) {
			next();
		}
	}

	getAllContacts: RequestHandler = async (req, res, next) => {
		try {
			const { role, search, current, limit } = req.query;
			const roleObject = role === RoleEnum.ALL ? {} : { role: role };

			const filterObj = {
				...roleObject,
				$or: [
					{ firstName: { $regex: search, $options: 'i' } },
					{ lastName: { $regex: search, $options: 'i' } }
				]
			};

			const totalContacts = await contactsModel.find(filterObj);
			const allData = await contactsModel.find(filterObj).skip((Number(current) - 1) * Number(limit)).limit(Number(limit));
			return res.status(StatusCodeEnum.OK).send({ success: true, message: "All contacts fetched", data: { data: allData, totalCount: totalContacts.length } });
		} catch (error) {
			next();
		}
	}
}

export const manageContacts = new ContactControllers();