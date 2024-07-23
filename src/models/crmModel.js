import { Schema } from 'mongoose';

const personFields = {
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
};

const companyDetailsFields = {
    company: {
        type: String
    },
    phone: {
        type: Number
    },
};

export const ContactSchema = new Schema({
    ...personFields,
    ...companyDetailsFields,
    created_date: {
        type: Date,
        default: Date.now
    }
});
