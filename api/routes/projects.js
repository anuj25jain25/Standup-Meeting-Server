const Project = require('../../models/project');

module.exports = function (router) {
    // Get: List of active projects
    const qry = {
        isActive: { $eq: true }
    }
    router.get('/projects', function (req, res) {

        Project.find(qry)
            .sort({ 'name': 1 })
            .exec()
            .then(teams => res.status(200).json(teams))
            .catch(err => res.status(500).json({
                message: 'Error finding team members!',
                error: err
            }));
    })

    // POST: Get new project...
    router.post('/projects', function (req, res) {
        let note = new Project(req.body);
        note.save(function (err, project) {
            if (err) {
                return res.status(400).json(err);
            }
            res.status(200).json(project);
        })
    })
}