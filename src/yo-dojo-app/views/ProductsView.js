define(['dojo/Evented', 'dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin',
		'dojo/on', 'dojo/dom-construct', 'require',
		'dstore/Memory',
		'dstore/RequestMemory',
		'dgrid/Grid',
		'dgrid/OnDemandGrid',
		'../presenters/ProductListPresenter',
		'./widgets/ProductDropdownRow',
		'./widgets/ProductListRow',
		'dojo/text!./_templates/ProductsView.html'], //  ,'dojox.dtl.Inline'],
	function (Evented, declare, _WidgetBase, _TemplatedMixin, on, domConstruct, require,
			  Memory, RequestMemory, Grid, OnDemandGrid,
			  presenter, ProductDropdownRow, ProductListRow, template) {

		//require("dojox.dtl.Inline");
		var ProductListView = declare([_WidgetBase, _TemplatedMixin], {

			templateString: template,

			products: null,
			productDropdownRows: null,
			productListRows: null,
			myGrid: null,

			postCreate: function () {
				var self = this;

				this.productDropdownRows = [];
				this.productListRows = [];
				//this.products = presenter.getAll();

				var columns = {
					id: 'Produkt',
					name: 'Antal',
					price: 'Pris'
				};

				this.myGrid = new OnDemandGrid({
					//collection: new RequestMemory({ target: '/products' }),
					columns: columns,
					loadingMessage: 'Loading data...',
					noDataMessage: 'No results found.'
				}, 'myGrid');
				this.myGrid.startup();

				presenter.getAll()
					.then(function (data) {
						self.products = data;
						self.populateProductDropdown();

						//var emptyStore = new Memory({ data: data });
						//var myGrid = new OnDemandGrid({
						//	collection: emptyStore,
						//	columns: columns,
						//	loadingMessage: 'Loading data...',
						//	noDataMessage: 'No results found.'
						//}, 'myGrid');
						//myGrid.startup();
					});
			},

			handleDropdownList: function () {
				this.productDropdownRows.forEach(function (productDropdownRow) {
					productDropdownRow.selector.checked = productDropdownRow.product.selected;
					productDropdownRow.selector.disabled = productDropdownRow.product.selected;
				});
			},

			showDropdownList: function (event) {
				this.productDropDown.classList.remove('hidden');
				this.handleDropdownList();
			},

			hideDropdownList: function (event) {
				var self = this;

				if (event.target.tagName === 'DIV') {
					this.productDropDown.classList.add('hidden');
					this.handleDropdownList();
				}
			},

			remove: function (product) {
				product.selected = false;
				var ix = this.productListRows.indexOf(product);
				this.productListRows.splice(ix, 1);
				domConstruct.destroy(this.productListContainer.children[ix]);
			},

			populateProductDropdown: function () {
				var self = this;

				this.products.forEach(function (product) {
					var productDropdownRow = new ProductDropdownRow({product: product});

					productDropdownRow.placeAt(self.productDropdownContainer);
					self.productDropdownRows.push(productDropdownRow);

					productDropdownRow.on('productSelection', function (selected, product) {
						if (selected) {
							product.selected = true;
							var productListRow = new ProductListRow({product: product});
							productListRow.placeAt(self.productListContainer);
							self.productListRows.push(product);
							productListRow.on('remove', function (product) {
								self.remove(product);
							});
						} else {
							product.selected = false;
							self.remove(product);
						}
					});
				});
			},

			search: function (event) {
				var self = this;
				presenter.getAll()
					.then(function (data) {
						var store = new Memory({ data: data });
						self.myGrid.set('collection', store);
					});
			}

		});

		return ProductListView;
	}
);
