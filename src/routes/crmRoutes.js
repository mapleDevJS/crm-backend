import {
    addNewContact,
    getContacts,
    getContactWithID,
    updateContact,
    deleteContact
} from '../controllers/crmController';
import {PORT} from "../../config";

// A new logging middleware function which can be reused
const logRequest = (req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
};

const routes = (app) => {
    app.route('/')
        .get((req, res) => {
            res.send(`Node and express server running on port ${PORT}`);
        });

    app.route('/contact')
        .get(logRequest, getContacts) // Middleware is now cleaner and more intuitive
        .post(addNewContact);

    app.route('/contact/:contactID')
        .get(getContactWithID)
        .put(updateContact)
        .delete(deleteContact);
};

export default routes;
