const TeamMember = require('../../models/teamMember');

module.exports = function (router) {
    // Get: List of team members
    router.get('/team', function (req, res) {
        TeamMember.find()
            .sort({ 'name': 1 })
            .exec()
            .then(teams => res.status(200).json(teams))
            .catch(err => res.status(500).json({
                message: 'Error finding team members!',
                error: err
            }));
    })

    // POST: Create new TeamMember
    router.post('/team', function (req, res) {
        let note = new TeamMember(req.body);
        note.save(function (err, member) {
            if (err) {
                return res.status(400).json(err);
            }
            res.status(200).json(member);
        })
    })
}