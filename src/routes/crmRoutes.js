import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
} from '../controllers/crmController';

const routes = (app) => {
  app
    .route('/contact')
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getContacts)

    .post(addNewContact);

  app
    .route('/contact/:contactID')
    .get(getContactWithID)

    .put(updateContact)

    .delete((req, res) => res.send('DELETE request successful!'));
};

export default routes;
