// 初始化，路由
var fu = require('./libs/fileUtiles');

module.exports = function (app) {
	var dir = __dirname + '/routes';

	fu.walkSync(dir, function (err, file) {
		var routes = require(file);
		routes(app);
	});
};