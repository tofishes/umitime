module.exports = function (app) {
	app.get('/user/index', function (req, res) {
		res.send('user-index')
	})
}