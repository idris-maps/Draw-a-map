var $ = require('browserify-zepto');
var txt = require('./txt.json');
var menu = require('./menu.js');
var L = require('leaflet');
var view = require('./views.js');

exports.index = function(lang) { console.log('page index ' + lang)
	if(lang == 'fr') { 
		var t = txt.fr.index; 
		config.lang = 'fr';
	}
	else { 
		var t = txt.en.index; 
		config.lang = 'en';

	}
	$('#content').empty();
	$('#content').append(view.index);
	fill(); 
	function fill() {
		$('#title').text(t.title)
		$('#btn').text(t.start)
		$('#link').attr('href', t.linkStart)
	}
}

exports.draw = function(lang) { console.log('page draw ' + lang)
	if(lang == 'fr') { 
		var t = txt.fr.draw; 
		config.lang = 'fr';
	}
	else { 
		var t = txt.en.draw;
		config.lang = 'en';
	}
	$('#content').empty();
	$('#content').append(view.draw); 
	fill();
	function fill() {
		$('#map').css('height', $(document).height() - 20);
		window.map = L.map('map');
/*
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
*/
		map.setView([37, 15], 3);
		menu.index();
	}
}
