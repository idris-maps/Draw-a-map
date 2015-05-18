var $ = require('browserify-zepto');
var director = require('director');








$(document).ready(function() {
	window.config = {
		mode: 'idle',
		features: [],
		lang: 'en',
		id: 0	
	}
	console.log(config)
	window.location.hash = '/en';
	var page = require('./lib/pages.js');
	routes(page);
});

function routes(page) {
	var routes = {
		'/:lang': page.index,
		'/:lang/draw': page.draw,
	};
	var router = director.Router(routes)
	router.init();
}

