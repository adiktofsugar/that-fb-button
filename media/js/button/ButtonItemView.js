define('button/ButtonItemView',
['marionette', 'backbone',
'button/ChangeAppView'],
function (Marionette, Backbone,
	ChangeAppView) {

	var V = Marionette.ItemView.extend({
		template: 'button/button-item',
		editTemplate: 'button/edit-button-item',

		ui: {
			'appShow': '.js-application-show',
			'changeApp': '.js-change-application'
		},

		events: {
			"submit .js-edit-form": "editFormHandler"
		},

		triggers: {
			"click .js-edit-button": "edit",
			"click .js-copy-button": "copy",
			"click .js-delete-button": "delete",
			"click .js-change-application-button": "application:change",

			// in edit state
			"click .js-cancel-edit-button": "edit:cancel",
		},

		initialize: function () {
			this.modelBinder = new Backbone.ModelBinder();
		},

		serializeData: function () {
			var data = V.__super__.serializeData.apply(this, arguments);

			// change config to an array separated by newlines whitespace
			if (data.config) {
				data.config = data.config.split(/\n/);	
			}
			
			return data;
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
		onCopy: function () {
			var attributes = this.model.attributes;
			// take out id...
			attributes.id = undefined;

			this.model.collection.create( attributes );
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
		},

		onApplicationChange: function () {
			this.ui.appShow.hide();
			this.ui.changeApp.show();

			if (this.changeAppView) {
				this.changeAppView.close();
			}

			this.changeAppView = new ChangeAppView({
				model: this.model
			});
			this.ui.changeApp.html('')
				.append( this.changeAppView.el );
			this.changeAppView.render();
		}
	});

	return V;

});