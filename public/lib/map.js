var L = require('leaflet');
var style = require('./featureStyle.js');
var menu = require('./menu.js');
var $ = require('browserify-zepto');

exports.init = function() {
	$('.leaflet-shadow-pane').empty();
	$('g', '.leaflet-zoom-animated').remove();
	$('.leaflet-marker-pane').empty();
	$('.leaflet-popup-pane').empty();
	var vectors = []
	if(config.features.length != 0) {
		for(i=0;i<config.features.length;i++) {
			var f = config.features[i];
			if(f.geometry.type == 'Point') {
				var icon = style.pointIcon(f.properties.style.color);
				L.marker(
					[f.geometry.coordinates[1],f.geometry.coordinates[0]], 
					{icon: icon}
				).bindPopup(f.properties.name).addTo(map);
			}
			else {
				vectors.push(f)
			}
		}
		L.geoJson(vectors, {
			style: function (feature) {
				return {color: style.toHex(feature.properties.style.color)};
			},
			onEachFeature: function (feature, layer) {
				if(feature.properties.name != undefined && feature.properties.name != '') {
					layer.bindPopup(feature.properties.name);
				}
			}
		}).addTo(map);
	}
	map.on('click', function(e) { 
		if(config.mode == 'point') {
			config.pts.push(e.latlng);
			config.mode = 'idle';
			L.marker(e.latlng, {icon: style.blueIcon}).addTo(map);
			config.zoom = map.getZoom();
			menu.confirmPoint();
		}
		if(config.mode == 'line') {
			$('#curr').parent().remove();
			config.pts.push(e.latlng);
			if(config.pts.length == 1) {
				var c = L.circle(config.pts[0], 10).addTo(map);
			} else {
				var c = L.polyline(config.pts).addTo(map);
				menu.confirmLine();
			}
			c._path.id = 'curr';
		}
		if(config.mode == 'polygon') {
			$('#curr').parent().remove();
			config.pts.push(e.latlng);
			if(config.pts.length == 1) {
				var c = L.circle(config.pts[0], 10).addTo(map);
			} else if(config.pts.length == 2) {
				var c = L.polyline(config.pts).addTo(map);
			} else {
				var c = L.polygon([config.pts]).addTo(map);
				menu.confirmPolygon();
			}
			c._path.id = 'curr';
		}
	})

}


