"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContactSchema = exports.AddContactSchema = void 0;
const yup = __importStar(require("yup"));
const roleEnum_1 = require("../enums/roleEnum");
const parse_1 = require("date-fns/parse");
const AddContactSchema = yup.object({
  _id: yup.string(),
  firstName: yup.string().min(1).required("First Name is Required"),
  lastName: yup.string().min(1).required("Last Name is Required"),
  email: yup.string().email("Invalid Email").required("Email Id is Required"),
  dateOfBirth: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) return value;
      return (0, parse_1.parse)(originalValue, "dd.MM.yyyy", new Date());
    })
    .typeError("Invalid Date of Birth")
    .required("Date of Birth is Required"),
  contactNumber: yup
    .string()
    .length(10, "Contact Number must have 10 digits")
    .matches(/^[6-9]{1}[0-9]{9}$/, "Invalid Contact Number"),
  role: yup.mixed().oneOf(Object.values(roleEnum_1.RoleEnum)),
  address: yup.string().min(1).required("Address is Required"),
  joiningDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) return value;
      return (0, parse_1.parse)(originalValue, "dd.MM.yyyy", new Date());
    })
    .typeError("Invalid Joining Date")
    .required("Joining Date is Required"),
  salary: yup
    .string()
    .matches(/^\d{0,10}(\.\d{0,2})?$/, "Salary must be a valid number"),
});
exports.AddContactSchema = AddContactSchema;
const UpdateContactSchema = yup.object({
  body: AddContactSchema,
  query: yup.object({
    id: yup
      .string()
      .length(24, "Invalid Contact Id")
      .required("Id is required to update the contact"),
  }),
});
exports.UpdateContactSchema = UpdateContactSchema;
