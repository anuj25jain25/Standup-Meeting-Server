const Standup = require('../../models/standup');
const mongoose = require('mongoose');

module.exports = function (router) {
    // Get: 12 newest standup meeting notes
    router.get('/standup', function (req, res) {

        Standup.find()
            .sort({ 'createdOn': -1 })
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(500).json({
                message: 'Error finding meeting notes!',
                error: err
            }));
    })

    // Get: by team member id
    router.get('/standup/:teamMemberId', function (req, res) {
        const qry = {
            _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId)
        };
        Standup.find(qry)
            .sort({ 'createdOn': -1 })
            .exec()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(500).json({
                message: 'Error finding meeting notes for team member!',
                error: err
            }));
    })

    // POST: Get new meeting note document
    router.post('/standup', function (req, res) {
        let note = new Standup(req.body);
        note.save(function (err, note) {
            if (err) {
                return res.status(400).json(err);
            }
            res.status(200).json(note);
        })
    })
}