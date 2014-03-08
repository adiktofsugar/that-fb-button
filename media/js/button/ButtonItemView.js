define('button/ButtonItemView',
['marionette', 'backbone'],
function (Marionette, Backbone) {

	return Marionette.ItemView.extend({
		template: 'button/button-item',
		editTemplate: 'button/edit-button-item',


		events: {
			"submit .js-edit-form": "editFormHandler"
		},

		triggers: {
			"click .js-edit-button": "edit",
			"click .js-delete-button": "delete",

			// in edit state
			"click .js-cancel-edit-button": "edit:cancel",
		},

		initialize: function () {
			this.modelBinder = new Backbone.ModelBinder();
		},

		onShow: function () {
			this.delegateEvents();
		},

		getTemplate: function () {
			if (this.isEditable) {
				return this.editTemplate;
			}
			return this.template;
		},

		editFormHandler: function (event) {
			event.preventDefault();
			this.model.save();
			this.triggerMethod("edit:cancel");
		},

		onEditCancel: function () {
			this.isEditable = false;
			this.render();
		},

		onEdit: function () {
			this.isEditable = true;
			this.render();
		},
		onDelete: function () {
			if(confirm("you sure about that?")) {
				this.model.destroy();
			}
		},

		onRender: function () {
			if (this.isEditable) {
				this.modelBinder.bind(this.model, this.el);
			} else {
				this.modelBinder.unbind();
			}
		}
	});

});