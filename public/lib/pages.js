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
		$('#lang').text(t.opLang)
		$('#langLink').attr('href', t.opLink)
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
		$('#linkIndex').attr('href', '#/' + config.lang)
		$('#map').css('height', $(document).height() - 20);
		window.map = L.map('map');

		L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: 18,
			opacity: 0.5,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		map.setView([37, 15], 3);
		menu.index();
	}
}
