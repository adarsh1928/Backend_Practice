const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fields: [{
        label: String,
        type: {
            type: String,
            enum: ['text', 'checkbox', 'radio', 'dropdown'],
            required: true,
        },
        options: [{
            label: String,
            value: String,
        }],
    }],
    submissions: [{
        student: {
            type: String,
            required: true,
        },
        responses: [{
            field: {
                type: Schema.Types.ObjectId,
                ref: 'Form.fields',
            },
            value: String,
        }],
    }],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
