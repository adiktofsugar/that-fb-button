var buttonConfig = require('./controllers/button-config');
var consumerButton = require('./controllers/consumer-button');

module.exports = function (server) {
	server.post('/configs', buttonConfig.create);
	server.get('/configs', buttonConfig.index);
	server.get('/configs/:id', buttonConfig.show);
	server.put('/configs/:id', buttonConfig.update);
	server.del('/configs/:id', buttonConfig.delete);
 
	server.get('/consumer/button', consumerButton.show);
};