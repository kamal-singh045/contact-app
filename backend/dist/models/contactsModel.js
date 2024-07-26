"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roleEnum_1 = require("../enums/roleEnum");
const contactsSchema = new mongoose_1.default.Schema({
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
        enum: roleEnum_1.RoleEnum
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
const contactsModel = mongoose_1.default.model("contacts", contactsSchema);
exports.default = contactsModel;
