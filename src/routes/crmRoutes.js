import expressRateLimit from 'express-rate-limit';
import {
    addNewContact,
    getContacts,
    getContactWithID,
    updateContact,
    deleteContact
} from '../controllers/crmController';
import {PORT} from "../../config";

const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // limit each IP to 100 requests per windowMs
    max: 100
});

const logRequest = (req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
};

const routes = (app) => {
    app.use(limiter); // apply rate limiting to all routes

    app.route('/')
        .get((req, res) => {
            res.send(`Node and express server running on port ${PORT}`);
        });

    app.route('/contact')
        .get(logRequest, getContacts)
        .post(addNewContact);

    app.route('/contact/:contactID')
        .get(getContactWithID)
        .put(updateContact)
        .delete(deleteContact);
};

export default routes;
