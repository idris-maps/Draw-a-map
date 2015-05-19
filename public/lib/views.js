exports.menuConfirm =
	'<p id="nameText"></p>' +
	'<input id="featureName" type="text">' +
	'<p id="colorText"></p>' +
	'<select id="featureColor"></select>' +
	'<br/>' +
	'<br/>' +
	'<button id="confirm" class="btn btn-red marginLeft"></button>' +
	'<button id="cancel" class="btn btn-red marginLeft"></button>';

exports.secDraw = 
	'<div id="draw" class="section">' +
		'<p id="drawTitle" class="menuTitle"></p>' +
		'<div id="drawContent" class="secContent">' +
			'<button id="point" class="btn btn-red marginLeft"></button>' +
			'<button id="line" class="btn btn-red marginLeft"></button>' +
			'<button id="polygon" class="btn btn-red marginLeft"></button>' +
		'</div>' +
	'</div>';

exports.secList = 
	'<div id="list" class="section">' +
		'<p id="listTitle" class="menuTitle"></p>' +
		'<div id="listContent" class="secContent">' +
			'<table id="listTable"></table>' +
		'</div>' +
	'</div>';

exports.secDownloadJson = 
	'<div id="downloadJson" class="section">' + 
		'<p id="downloadJsonTitle" class="menuTitle"></p>' +
		'<div id="downloadJsonContent" class="secContent">' +
		'</div>' +
	'</div>';

exports.secUpload = 
	'<div id="upload" class="section">' + 
		'<p id="uploadTitle" class="menuTitle"></p>' +
		'<div id="uploadContent" class="secContent">' +
			'<p id="geojsonFile"></p>' +
			'<input id="uploadGeojson" type="file">' +
			'<p id="csvFile"></p>' +
			'<input id="uploadCsv" type="file">' +
		'</div>' +
	'</div>';

exports.menuEdit = 
	'<p>' +
		'<span id="id"></span>' +
		'<br/>' +
		'<span id="name"></span>' +
	'</p>' +
	'<hr/>' +
	'<p id="titleName"></p>' +
	'<input id="newname" type="text">' +
	'<button id="okName" class="btn btn-red marginLeft">OK</button>' +
	'<hr/>' +
	'<p>' +
		'<span id="titleCol"></span>' +
	'</p>' +
	'<select id="newcolor"></select>' +
	'<button id="okCol" class="btn btn-red marginLeft">OK</button>' +
	'<br/>' +
	'<hr/>' +
	'<button id="cancel" class="btn btn-red marginLeft"></button>';

exports.menuChangeName = 
	'<p>' +
		'<span id="title"></span>' +
		'<br/>' +
		'<span id="id"></span>' +
		'<br/>' +
		'<span id="name"></span>' +
	'</p>' +
	'<input id="newname" type="text">' +
	'<br/>' +
	'<br/>' +
	'<button id="ok" class="btn btn-red marginLeft"></button>' +
	'<button id="cancel" class="btn btn-red marginLeft"></button>';

exports.menuChangeStyle = 
	'<p>' +
		'<span id="title"></span>' +
		'<br/>' +
		'<span id="id" class="s"></span>' +
		'<br/>' +
		'<span id="name" class="s"></span>' +
	'</p>' +
	'<select id="newcolor"></select>' +
	'<br/>' +
	'<br/>' +
	'<button id="ok" class="btn btn-red marginLeft"></button>' +
	'<button id="cancel" class="btn btn-red marginLeft"></button>';

exports.index = 
	'<h1 id="title"></h1>' +
	'<div id="indexImgDiv">' +
		'<img id="indexImg" src="/img/site/treasuremap.png" />' +
		'<br/><br/><br/>' +
		'<a id="link">' +
			'<button id="btn" class="btn btn-red"></button>' +
		'</a>' +
	'</div>';


exports.draw = 
	'<div class="row">' +
		'<div class="col-md-3 col-sm-5 col-xs-12">' +
			'<img id="logo" src="/img/site/treasuremap.png" />' +
			'<div id="menu"></div>' +
			'<br/><br/>' +
		'</div>' +
		'<div class="col-md-9 col-sm-7 col-xs-12">' +
			'<div id="map"></div>' +
		'</div>' +
	'</div>';
