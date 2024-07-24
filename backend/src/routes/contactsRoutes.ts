import { Router } from 'express';
import { manageContacts } from '../controllers/contactControllers';

const contactRoutes =  Router();
contactRoutes.post('/add-contact', manageContacts.addContactController);
contactRoutes.put('/update-contact', manageContacts.updateContactController);
contactRoutes.delete('/delete-contact', manageContacts.deleteContactController);

contactRoutes.get('/get-all-contacts', manageContacts.getAllContacts);
contactRoutes.get('/filter-contacts', manageContacts.filterContacts);

export default  contactRoutes;

