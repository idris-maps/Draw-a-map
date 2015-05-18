var $ = require('browserify-zepto');
var txt = require('./txt.json');
var menu = require('./menu.js');

exports.showHide = function() {
	$('.section').on('click', function(e) {
		var tId = e.target.id;
		var id = tId.substr(0,tId.length -5)
		if($('#' + id + 'Content').css('display') == 'none') {
			$('#' + id + 'Content').css('display', 'block');
			$('#' + id + 'Sign').text(' - ');
		} else {
			$('#' + id + 'Content').css('display', 'none');
			$('#' + id + 'Sign').text(' + ');
		}
	})
}

exports.draw = function(t) {
	$('#drawTitle').append('<span id="drawSign"> + </span>' + t.draw);
	$('#point').text(t.point);
	$('#line').text(t.line);
	$('#polygon').text(t.polygon);

	$('#point').on('click', function() { 
		config.mode = 'point';
		config.pts = [];
		$('#menu').empty();
		$('#menu').append('<p>').text(t.drawPoint);
	});
	$('#line').on('click', function() { 
		config.mode = 'line';
		config.pts = [];
		$('#menu').empty();
		$('#menu').append('<p>').text(t.drawLine);
	});
	$('#polygon').on('click', function() { 
		config.mode = 'polygon';
		config.pts = [];
		$('#menu').empty();
		$('#menu').append('<p>').text(t.drawPolygon);
	});
}
exports.list = function(t) {
	if(config.features.length != 0) {
		$('#listTitle').append('<span id="listSign"> + </span>' + t.list);
		$('#listTable').append('<tr id="head" class="head"><td>ID<td>' + t.name + '</td><td></td></tr>')
	}
	for(i=0;i<config.features.length;i++) {
		var p = config.features[i].properties;
		$('#listTable').append('<tr><td>' + p.id + 
			'</td><td class="name" id="' + i + '">' + p.name + 
			'</td><td class="del" id="' + i + '">' + t.del + 
		'</td></tr>');
	}
	$('.name').on('click', function(e) {
		var i = +e.target.id;
		menu.edit(i);
	});
	$('.del').on('click', function(e) {
		var i = +e.target.id;	
		config.features.splice(i,1);
		menu.index();
	})
}

exports.downloadJson = function(t) {
	if(config.features.length != 0) {
		$('#downloadJsonTitle').append('<span id="downloadJsonSign"> + </span>' + t.dlTitle);
		$('#downloadJsonContent').append('<a id="geojsonBtn"><button>' + t.dl + '</button></a>');

		var data = {type: 'FeatureCollection', features: config.features};
		var json = JSON.stringify(data);
		var blob = new Blob([json], {type: "application/json"});
		var url  = URL.createObjectURL(blob);
		$('#geojsonBtn').attr({
			download: Date.now() + 'geodata.json',
			href: url
		});
	}
}

exports.upload = function(t) {
	$('#uploadTitle').append('<span id="uploadSign"> + </span>' + t.upTitle);
	var fileInput = $('#uploadFile');
	fileInput.on("change", uploadFile, false);
	function uploadFile(e) {
		var fileList = this.files;
		var reader = new FileReader();
		reader.onload = (function(tf) {
			return function(e) { 
				var coll = JSON.parse(e.target.result);
				for(i=0;i<coll.features.length;i++) {
					var feat = coll.features[i];
					config.id = config.id + 1;
					feat.properties.id = config.id;
					if(feat.properties.name == undefined) {
						feat.properties.name = 'no name';
					}
					if(feat.properties.style == undefined) {
						feat.properties.style = {};
					}
					if(feat.properties.style.color == undefined) {
						feat.properties.style.color = 'Blue';
					}
					config.features.push(feat);
				}			
			}
		})(fileList[0]);
		reader.readAsText(fileList[0]);
		reader.onloadend = function() { menu.index(); }
	}
}
