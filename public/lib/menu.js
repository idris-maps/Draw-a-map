var $ = require('browserify-zepto');
var txt = require('./txt.json');
var map = require('./map.js');
var ctrl = require('./secCtrl.js');
var view = require('./views.js');

exports.index = index;
function index() {
	map.init();
	$('#menu').empty();
	if(config.lang == 'fr') { var t = txt.fr.draw.menu.index }
	else { var t = txt.en.draw.menu.index }
	$('#menu').append(view.secDraw);
	ctrl.draw(t);
	if(config.features != 0) {
		$('#menu').append(view.secList);
		ctrl.list(t);
	}
	$('#menu').append(view.secUpload);
	ctrl.upload(t);
	if(config.features != 0) {
		$('#menu').append(view.secDownloadJson);
		ctrl.downloadJson(t);
	}
	ctrl.showHide();
}



exports.confirmPoint = function() {
	$('#menu').empty();
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.confirmPoint;
		var colors = txt.fr.colorOptions;
	}
	else { 
		var t = txt.en.draw.menu.confirmPoint;
		var colors = txt.en.colorOptions;
	}
	$('#menu').append(view.menuConfirm); 
	fill();
	function fill() {
		$('#nameText').text(t.nameText);
		$('#featureName').attr('placeholder', t.namePlaceholder);
		$('#colorText').text(t.colorText);
		for(i=0;i<colors.length;i++) {
			$('#featureColor').append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>');
		}
		$('#confirm').text(t.confirm);
		$('#cancel').text(t.cancel);

		$('#cancel').on('click', index);
		$('#confirm').on('click', function() {
			config.id = config.id + 1;
			config.features.push({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [config.pts[0].lng, config.pts[0].lat]
				},
				properties: {
					id: config.id,
					name: $('#featureName').val(),
					style: {
						color: $('#featureColor').val()
					}
				}
			});
			index();
		})
	}
}

exports.confirmLine = function() {
	$('#menu').empty();
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.confirmLine;
		var colors = txt.fr.colorOptions;
	}
	else { 
		var t = txt.en.draw.menu.confirmLine;
		var colors = txt.en.colorOptions;
	}
	$('#menu').append(view.menuConfirm); 
	fill();
	function fill() {
		$('#nameText').text(t.nameText);
		$('#featureName').attr('placeholder', t.namePlaceholder);
		$('#colorText').text(t.colorText);
		for(i=0;i<colors.length;i++) {
			$('#featureColor').append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>');
		}
		$('#confirm').text(t.confirm);
		$('#cancel').text(t.cancel);

		$('#cancel').on('click', index);
		$('#confirm').on('click', function() {
			config.id = config.id + 1;
			var newPts = [];
			for(i=0;i<config.pts.length;i++) {
				newPts.push([config.pts[i].lng, config.pts[i].lat]);
			}

			config.features.push({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: newPts
				},
				properties: {
					id: config.id,
					name: $('#featureName').val(),
					style: {
						color: $('#featureColor').val()
					}
				}
			});
			config.mode = 'idle';
			index();
		});
	}
}

exports.confirmPolygon = function() {
	$('#menu').empty();
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.confirmPolygon;
		var colors = txt.fr.colorOptions;
	}
	else { 
		var t = txt.en.draw.menu.confirmPolygon;
		var colors = txt.en.colorOptions;
	}
	$('#menu').append(view.menuConfirm);
	fill();
	function fill() {
		$('#nameText').text(t.nameText);
		$('#featureName').attr('placeholder', t.namePlaceholder);
		$('#colorText').text(t.colorText);
		for(i=0;i<colors.length;i++) {
			$('#featureColor').append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>');
		}
		$('#confirm').text(t.confirm);
		$('#cancel').text(t.cancel);

		$('#cancel').on('click', index);
		$('#confirm').on('click', function() {
			config.id = config.id + 1;
			var newPts = [];
			for(i=0;i<config.pts.length;i++) {
				newPts.push([config.pts[i].lng, config.pts[i].lat]);
			}

			config.features.push({
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [newPts]
				},
				properties: {
					id: config.id,
					name: $('#featureName').val(),
					style: {
						color: $('#featureColor').val()
					}
				}
			});
			config.mode = 'idle';
			index();
		});
	}
}

exports.edit = function(i) {
	var f = config.features[i];
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.edit;
		var colors = txt.fr.colorOptions;
	}
	else { 
		var t = txt.en.draw.menu.edit;
		var colors = txt.en.colorOptions;
	}
	$('#menu').empty();
	$('#menu').append(view.menuEdit); 
	fill();
	function fill() {
		$('#titleName').text(t.titleName);
		$('#titleCol').text(t.titleCol);
		$('#id').append('<span class="s"> ID:</span> ' + f.properties.id);
		$('#name').append('<span class="s">' + t.name + ':</span> ' + f.properties.name);
		$('#newname').attr('placeholder', t.newname);
		$('#cancel').text(t.cancel);

		for(i=0;i<colors.length;i++) {
			if(colors[i].id == f.properties.style.color) {
				var sel = 'selected'
			} else { var sel = '' }
			$('#newcolor').append('<option value="' + colors[i].id + '" ' + sel + '>' + colors[i].name + '</option>');
		}

		$('#okName').on('click', function() {
			f.properties.name = $('#newname').val();
			index();
		});
		$('#okCol').on('click', function() {
			f.properties.style.color = $('#newcolor').val();
			index();
		});
		$('#cancel').on('click', function() {
			index();
		});
	}
}

exports.changeName = function(i) {
	var f = config.features[i];
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.changeName;
	}
	else { 
		var t = txt.en.draw.menu.changeName;
	}
	$('#menu').empty();
	$('#menu').append(view.menuChangeName); 
	fill();
	function fill() {
		$('#title').text(t.title);
		$('#id').text('ID: ' + f.properties.id);
		$('#name').text(t.name + ': ' + f.properties.name);
		$('#newname').attr('placeholder', t.newname);
		$('#ok').text(t.ok);
		$('#cancel').text(t.cancel);
		
		$('#ok').on('click', function() {
			f.properties.name = $('#newname').val();
			index();
		});
		$('#cancel').on('click', function() {
			index();
		});
	}
} 

exports.changeStyle = function(i) {
	var f = config.features[i];
	if(config.lang == 'fr') { 
		var t = txt.fr.draw.menu.changeStyle;
		var colors = txt.fr.colorOptions;
	}
	else { 
		var t = txt.en.draw.menu.changeStyle;
		var colors = txt.en.colorOptions;
	}
	$('#menu').empty();
	$('#menu').append(view.menuChangeStyle); 
	fill();
	function fill() {
		$('#title').text(t.title);
		$('#id').text('ID: ' + f.properties.id);
		$('#name').text(t.name + ': ' + f.properties.name);
		for(i=0;i<colors.length;i++) {
			if(colors[i].id == f.properties.style.color) {
				var sel = 'selected'
			} else { var sel = '' }
			$('#newcolor').append('<option value="' + colors[i].id + '" ' + sel + '>' + colors[i].name + '</option>');
		}
		$('#ok').text(t.ok);
		$('#cancel').text(t.cancel);

		$('#ok').on('click', function() {
			f.properties.style.color = $('#newcolor').val();
			index();
		});
		$('#cancel').on('click', function() {
			index();
		});
	}
}
