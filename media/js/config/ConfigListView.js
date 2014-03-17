define('config/ConfigListView',
['jquery', 'marionette', 'backbone',
'config/ConfigItemView', 'config/ConfigModel'],
function ($, Marionette, Backbone,
	ConfigItemView, ConfigModel) {

	return Marionette.CompositeView.extend({

		template: 'config/config-list',
		itemView: ConfigItemView,

		events: {
			"submit .js-new-button-section form": "newConfigFormHandler"
		},

		triggers: {
			"click .js-new-button": "newSection:show",
			"click .js-new-button-section .js-new-button-section-close": "newSection:hide"
		},

		ui: {
			newConfig: ".js-new-button",
			newSection: ".js-new-button-section"
		},

		initialize: function () {
			this.modelBinder = new Backbone.ModelBinder();
		},

		onNewSectionShow: function () {

			this.newModel = new ConfigModel();
			this.modelBinder.bind(this.newModel, this.ui.newSection);

			this.ui.newConfig.hide();
			this.ui.newSection.show();
		},
		onNewSectionHide: function () {

			this.newModel = undefined;
			this.modelBinder.unbind();

			this.ui.newConfig.show();
			this.ui.newSection.hide();
		},

		newConfigFormHandler: function (event) {

			event.preventDefault();

			var $form = $(event.target);
			this.collection.create( this.newModel.toJSON() );
			this.triggerMethod("newSection:hide");

		},

		
		onShow: function () {
			this.delegateEvents();
		},

	});

});
