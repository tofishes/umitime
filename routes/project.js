module.exports = function (app) {
	app.get('/project', function (req, res) {
		res.send('project')
	})
};