var ENV = "dev";


var restify = require("restify");

var addRoutes = require('./add-routes');
var addModels = require('./add-models');

var middleware = require('./middleware');
var database = require('./database')(ENV);

var server = restify.createServer();


addModels(database);

server.use(function (req, res, next) {
	req.db = database;
	next(req, res);
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use( middleware.session );
server.use( middleware.user );
server.use( middleware.logging );

addRoutes(server);



server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});