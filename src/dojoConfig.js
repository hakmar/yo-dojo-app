/*jshint unused:false*/
var dojoConfig = {
	async: true,
	baseUrl: '',
	tlmSiblingOfDojo: false,
	isDebug: true,
	packages: [
		'dojo',
		'dijit',
		'put-selector',
		'xstyle',
		'dgrid',
		'yo-dojo-app'
	],
	deps: [ 'yo-dojo-app' ],
	callback: function (yoDojoApp) {
		yoDojoApp.init();
	}
};
