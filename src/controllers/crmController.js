import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

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
    // validate request body
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const updateData = {
        name: req.body.name,
        email: req.body.email
    };
    Contact.findOneAndUpdate({_id: {$eq: req.params.contactID}}, updateData, {new: true, useFindAndModify: false}, handleResponse(res));
};

export const deleteContact = (req, res) => {
    Contact.remove({_id: req.params.contactID}, err => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Successfully deleted contact'});
    });
};
