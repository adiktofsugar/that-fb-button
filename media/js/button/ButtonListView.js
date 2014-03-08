define('button/ButtonListView',
['jquery', 'marionette', 'backbone',
'button/ButtonItemView', 'button/ButtonModel'],
function ($, Marionette, Backbone,
	ButtonItemView, ButtonModel) {

	return Marionette.CompositeView.extend({

		events: {
			"submit .js-new-button-section form": "newButtonFormHandler"
		},

		triggers: {
			"click .js-new-button": "newSection:show",
			"click .js-new-button-section .js-new-button-section-close": "newSection:hide"
		},

		ui: {
			newButton: ".js-new-button",
			newSection: ".js-new-button-section"
		},

		initialize: function () {
			this.modelBinder = new Backbone.ModelBinder();
		},

		onNewSectionShow: function () {

			this.newModel = new ButtonModel();
			this.modelBinder.bind(this.newModel, this.ui.newSection);

			this.ui.newButton.hide();
			this.ui.newSection.show();
		},
		onNewSectionHide: function () {

			this.newModel = undefined;
			this.modelBinder.unbind();

			this.ui.newButton.show();
			this.ui.newSection.hide();
		},

		newButtonFormHandler: function (event) {

			event.preventDefault();

			var $form = $(event.target);
			this.collection.create( this.newModel.toJSON() );
			this.triggerMethod("newSection:hide");

		},

		template: 'button/button-list',
		itemView: ButtonItemView,
		
		onShow: function () {
			this.delegateEvents();
		},

	});

});