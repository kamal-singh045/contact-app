"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageContacts = void 0;
const contactsModel_1 = __importDefault(require("../models/contactsModel"));
const statusCodeEnum_1 = require("../enums/statusCodeEnum");
const roleEnum_1 = require("../enums/roleEnum");
const contactValidation_1 = require("../validators/contactValidation");
class ContactControllers {
  constructor() {
    this.addContactController = (req, res, next) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const validatedData =
            yield contactValidation_1.AddContactSchema.validate(req.body).catch(
              (err) => err,
            );
          if (validatedData.errors && validatedData.errors.length)
            return res
              .status(statusCodeEnum_1.StatusCodeEnum.FORBIDDEN)
              .send({ success: false, message: validatedData.errors[0] });
          const alreadyExists = yield contactsModel_1.default.findOne({
            email: req.body.email,
          });
          if (alreadyExists)
            return res
              .status(statusCodeEnum_1.StatusCodeEnum.CONFLICT)
              .send({ success: false, message: "Email Already Exists." });
          const newUserData = Object.assign({}, req.body);
          delete newUserData._id; //default empty id is coming from frontend, so first remove it.
          yield contactsModel_1.default.create(newUserData);
          return res
            .status(statusCodeEnum_1.StatusCodeEnum.CREATED)
            .send({ success: true, message: "Contact is Created" });
        } catch (error) {
          console.log(error);
          next();
        }
      });
    this.deleteContactController = (req, res, next) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const idToDelete = req.query.id;
          const checkExists = yield contactsModel_1.default.findOne({
            _id: idToDelete,
          });
          if (!checkExists)
            return res
              .status(statusCodeEnum_1.StatusCodeEnum.NOT_FOUND)
              .send({ success: false, message: "Contact does not exists" });
          yield contactsModel_1.default.findByIdAndDelete(idToDelete);
          return res
            .status(statusCodeEnum_1.StatusCodeEnum.OK)
            .send({ success: true, message: "Contact deleted Successfully." });
        } catch (error) {
          next();
        }
      });
    this.updateContactController = (req, res, next) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const validatedData =
            yield contactValidation_1.UpdateContactSchema.validate({
              query: req.query,
              body: req.body,
            }).catch((err) => err);
          if (validatedData.errors && validatedData.errors.length)
            return res
              .status(statusCodeEnum_1.StatusCodeEnum.FORBIDDEN)
              .send({ success: false, message: validatedData.errors[0] });
          const idToUpdate = req.query.id;
          const checkExists = yield contactsModel_1.default.findOne({
            _id: idToUpdate,
          });
          if (!checkExists)
            return res
              .status(statusCodeEnum_1.StatusCodeEnum.NOT_FOUND)
              .send({ success: false, message: "Contact does not exists" });
          yield contactsModel_1.default.findByIdAndUpdate(idToUpdate, {
            $set: req.body,
          });
          return res
            .status(statusCodeEnum_1.StatusCodeEnum.OK)
            .send({ success: true, message: "Contact updated Successfully." });
        } catch (error) {
          next();
        }
      });
    this.getAllContacts = (req, res, next) =>
      __awaiter(this, void 0, void 0, function* () {
        try {
          const { role, search, current, limit } = req.query;
          const roleObject =
            role === roleEnum_1.RoleEnum.ALL ? {} : { role: role };
          const filterObj = Object.assign(Object.assign({}, roleObject), {
            $or: [
              { firstName: { $regex: search, $options: "i" } },
              { lastName: { $regex: search, $options: "i" } },
            ],
          });
          const totalContacts = yield contactsModel_1.default.find(filterObj);
          const allData = yield contactsModel_1.default
            .find(filterObj)
            .skip((Number(current) - 1) * Number(limit))
            .limit(Number(limit));
          return res
            .status(statusCodeEnum_1.StatusCodeEnum.OK)
            .send({
              success: true,
              message: "All contacts fetched",
              data: { data: allData, totalCount: totalContacts.length },
            });
        } catch (error) {
          next();
        }
      });
  }
}
exports.manageContacts = new ContactControllers();
