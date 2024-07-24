import { RequestHandler } from "express";
import contactsModel from "../models/contactsModel";
import { StatusCodeEnum } from "../enums/statusCodeEnum";
import { RoleEnum } from "../enums/roleEnum";

class ContactControllers {
	addContactController:RequestHandler = async(req, res, next) => {
		try {
			const alreadyExists = await contactsModel.findOne({email: req.body.email});
			if(alreadyExists) return res.status(StatusCodeEnum.CONFLICT).send({success: false, message: "Email Already Exists."});
			const newUserData = {...req.body};
			delete newUserData._id; //default empty id is coming from frontend, so first remove it.
			await contactsModel.create(newUserData);
			return res.status(StatusCodeEnum.CREATED).send({success: true, message: "Contact is Created"});
		} catch (error) {
			next();
		}
	}

	deleteContactController:RequestHandler = async(req, res, next) => {
		try {
			const idToDelete = req.query.id;
			const checkExists = await contactsModel.findOne({_id: idToDelete});
			if(!checkExists) return res.status(StatusCodeEnum.NOT_FOUND).send({success: false, message: "Contact does not exists"});

			await contactsModel.findByIdAndDelete(idToDelete);
			return res.status(StatusCodeEnum.OK).send({success: true, message: "Contact deleted Successfully."});
		} catch (error) {
			next();
		}
	}

	updateContactController:RequestHandler = async(req, res, next) => {
		try {
			const idToUpdate = req.query.id;
			const checkExists = await contactsModel.findOne({_id: idToUpdate});
			if(!checkExists) return res.status(StatusCodeEnum.NOT_FOUND).send({success: false, message: "Contact does not exists"});

			await contactsModel.findByIdAndUpdate(idToUpdate, {$set: req.body});
			return res.status(StatusCodeEnum.OK).send({success: true, message: "Contact updated Successfully."});
		} catch (error) {
			next();
		}
	}

	getAllContacts:RequestHandler = async(req, res, next) => {
		try {
			const allData = await contactsModel.find();
			return res.status(StatusCodeEnum.OK).send({success: true, message: "All contacts fetched", data: allData});
		} catch (error) {
			next();
		}
	}

	filterContacts:RequestHandler = async(req, res, next) => {
		try {
			const { key , value } = req.query;
			const filter = value === RoleEnum.ALL ? {} : {[key as string]: value}; 
			const filteredData = await contactsModel.find(filter);
			return res.status(StatusCodeEnum.OK).send({success: true, message: "Filtered contacts fetched", data: filteredData});
		} catch (error) {
			next();
		}
	}
}

export const manageContacts = new ContactControllers();