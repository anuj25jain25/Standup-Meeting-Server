const mongoose = require('mongoose');

const sizeValidator = [
    function (val) {
        let testValue = val.trim();
        return (testValue.length > 0 && testValue.length <= 50);
    },
    '{PATH} must be between 1 and 50 characters long'
];

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: sizeValidator
    }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);

