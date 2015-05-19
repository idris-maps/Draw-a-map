var Papa = require('papaparse');
var menu = require('./menu.js');

exports.geojson = function(e) {
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

exports.csv = function(e) {
	var fileList = this.files;
	var reader = new FileReader();
	reader.onload = (function(tf) {
		return function(e) { 
			var converted = Papa.parse(e.target.result, {header: true});

			for(i=0;i<converted.data.length;i++) {
				var f = converted.data[i];

				if(f['x'] != undefined) { var lat = f['x']; }
				if(f['latitude'] != undefined) { var lat = f['latitude']; }
				if(f['lat'] != undefined) { var lat = f['lat']; }

				if(f['y'] != undefined) { var lng = f['y']; }
				if(f['longitude'] != undefined) { var lng = f['longitude']; }
				if(f['long'] != undefined) { var lng = f['long']; }
				if(f['lng'] != undefined) { var lng = f['lng']; }

				if(f['name'] != undefined) { var name = f['name']; } 
				else { var name = ''; }

				if(lat != undefined && lat !='' && lng != undefined && lng != '') {
					config.id = config.id + 1;
					config.features.push({
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [+lng, +lat]
						},
						properties: {
							id: config.id,
							name: name,
							style: { color: 'Blue' }
						}
					})
				}
			}
		}
	})(fileList[0]);
	reader.readAsText(fileList[0]);
	reader.onloadend = function() { menu.index(); }
}
