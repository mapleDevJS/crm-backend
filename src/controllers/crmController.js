import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

// The extracted function to handle responses
const handleResponse = (res) => (err, entity) => {
    if (err) {
        res.send(err);
    }
    res.json(entity);
};

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);
    newContact.save(handleResponse(res));
};

export const getContacts = (req, res) => {
    Contact.find({}, handleResponse(res));
};

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactID, handleResponse(res));
};

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({_id: req.params.contactID}, req.body, {new: true, useFindAndModify: false}, handleResponse(res));
};

export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactID}, err => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Successfully deleted contact'});
    });
};
