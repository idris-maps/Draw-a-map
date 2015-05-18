var icon = L.Icon.extend({
	options: {
		shadowUrl: 'img/icons/shadow.png',
		iconSize:     [30, 41],
		shadowSize:   [20, 20],
		iconAnchor:   [15, 41],
		shadowAnchor: [4, 20],
		popupAnchor:  [0, -42]
	}
});

exports.blueIcon = new icon({iconUrl: 'img/icons/blue.png'});
exports.greenIcon = new icon({iconUrl: 'img/icons/green.png'});
exports.redIcon = new icon({iconUrl: 'img/icons/red.png'});
exports.orangeIcon = new icon({iconUrl: 'img/icons/orange.png'});
exports.purpleIcon = new icon({iconUrl: 'img/icons/purple.png'});
exports.grayIcon = new icon({iconUrl: 'img/icons/gray.png'});

exports.pointIcon = function(color) {
	var c = color.toLowerCase();
	return new icon({iconUrl: 'img/icons/' + c + '.png'}) 
}

exports.toHex = function(color) {
	if(color == 'Blue') { return '#1f78b4' }
	else if(color == 'Green') { return '#33a02c' }
	else if(color == 'Red') { return '#e31a1c' }
	else if(color == 'Orange') { return '#ff7f00' }
	else if(color == 'Purple') { return '#6a3d9a' }
	else if(color == 'Gray') { return '#333333' }
	else { return '#1f78b4' }
}
