var buttonConfig = require('./controllers/button-config');

module.exports = function (server) {
	server.post('/buttons', buttonConfig.create);
	server.get('/buttons', buttonConfig.index);
	server.get('/buttons/:id', buttonConfig.show);
	server.put('/buttons/:id', buttonConfig.update);
	server.del('/buttons/:id', buttonConfig.delete);
};