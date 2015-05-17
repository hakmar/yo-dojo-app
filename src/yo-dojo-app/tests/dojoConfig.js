/*jshint unused:false*/
var dojoConfig = {
	async: true,
	baseUrl: location.pathname.replace(/\/yo-dojo-app\/.*$/, '/'),
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
	deps: [ 'yo-dojo-app/tests/ready' ]
};
