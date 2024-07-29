import { Router } from "express";
import { manageContacts } from "../controllers/contactControllers";

const contactRoutes = Router();
contactRoutes.post("/add-contact", manageContacts.addContactController);
contactRoutes.put("/update-contact", manageContacts.addContactController);
contactRoutes.delete("/delete-contact", manageContacts.deleteContactController);

contactRoutes.get("/get-all-contacts", manageContacts.getAllContacts);

export default contactRoutes;
