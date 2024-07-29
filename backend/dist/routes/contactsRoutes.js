"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactControllers_1 = require("../controllers/contactControllers");
const contactRoutes = (0, express_1.Router)();
contactRoutes.post(
  "/add-contact",
  contactControllers_1.manageContacts.addContactController,
);
contactRoutes.put(
  "/update-contact",
  contactControllers_1.manageContacts.updateContactController,
);
contactRoutes.delete(
  "/delete-contact",
  contactControllers_1.manageContacts.deleteContactController,
);
contactRoutes.get(
  "/get-all-contacts",
  contactControllers_1.manageContacts.getAllContacts,
);
exports.default = contactRoutes;
