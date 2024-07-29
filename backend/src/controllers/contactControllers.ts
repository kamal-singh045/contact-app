import { RequestHandler } from "express";
import contactsModel from "../models/contactsModel";
import { StatusCodeEnum } from "../enums/statusCodeEnum";
import { RoleEnum } from "../enums/roleEnum";
import { AddContactSchema } from "../validators/contactValidation";
import mongoose from "mongoose";

class ContactControllers {
	addContactController: RequestHandler = async (req, res, next) => {
		try {
			const validatedData = await AddContactSchema.validate(req.body).catch(err => err);
			if (validatedData.errors && validatedData.errors.length)
				return res.status(StatusCodeEnum.FORBIDDEN).send({ status: false, message: validatedData.errors[0] });

			const alreadyExists = await contactsModel.findOne({ email: req.body.email });
			if ((!req.body._id && alreadyExists) || (alreadyExists && (alreadyExists?.email !== req.body.email || (alreadyExists?.email === req.body.email && alreadyExists._id.toString() != req.body._id)))
			) return res.status(StatusCodeEnum.CONFLICT).send({ status: false, message: "Email Already Exists." });

			const id = req.body._id ? req.body._id : new mongoose.Types.ObjectId();
			await contactsModel.findByIdAndUpdate({ _id: id }, req.body, { new: true, upsert: true });
			return res.status(StatusCodeEnum.CREATED).send({ status: true, message: "Contact is Created" });
		} catch (error) {
			console.log(error);
			next();
		}
	}

	deleteContactController: RequestHandler = async (req, res, next) => {
		try {
			const idToDelete = req.query.id;
			const checkExists = await contactsModel.findOne({ _id: idToDelete });
			if (!checkExists) return res.status(StatusCodeEnum.NOT_FOUND).send({ status: false, message: "Contact does not exists" });

			await contactsModel.findByIdAndDelete(idToDelete);
			return res.status(StatusCodeEnum.OK).send({ status: true, message: "Contact deleted Successfully." });
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
			return res.status(StatusCodeEnum.OK).send({ status: true, message: "All contacts fetched", data: { data: allData, totalCount: totalContacts.length } });
		} catch (error) {
			next();
		}
	}
}

export const manageContacts = new ContactControllers();