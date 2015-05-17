define([
	'dojo/dom',
	'./views/ProductsView',
	'exports'
], function (dom, ProductListView, yoDojoApp) {
	yoDojoApp.init = function () {
		//	summary:
		//		This function is executed automatically by the loader configuration.
		//		It will be executed after the page has loaded, the DOM is ready, and all
		//		dependencies of this module have been loaded. Use this function to initialize
		//		the application; for instance, creating	a page controller or running the
		//		Dojo parser.
		var parentNode = dom.byId("viewContainer");

		var productListView = new ProductListView(null, createAndAppendDiv(parentNode));

		function createAndAppendDiv(parent) {
			var div = document.createElement("div");
			parent.appendChild(div);
			return div;
		}
	};
});
