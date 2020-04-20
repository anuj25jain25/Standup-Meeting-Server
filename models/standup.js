const mongoose = require('mongoose');

const requiredStringValidator = [
    function(val){
        let testValue = val.trim();
        return (testValue.length > 0);
    },
    'Please supply a value for {PATH}' 
];

const standupSchema = new mongoose.Schema({
    teamMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teamMembers'
    },
    teamMember: { type: String, required: true, validate: requiredStringValidator },
    project: { type: String, required: true, validate: requiredStringValidator },
    workYesterday: { type: String, required: true, validate: requiredStringValidator },
    workToday: { type: String, required: true, validate: requiredStringValidator },
    impediment: { type: String, required: true, default: 'None' },
    createdOn: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Standup', standupSchema);