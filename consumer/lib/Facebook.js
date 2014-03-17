var Facebook;
(function () {

	var initDeferred = new Deferred();
	var readyDeferred = new Deferred();
	var ready = readyDeferred.done;

	var vent = new EventAggregator();

	var wrapError = function (fbErrorObj) {
		var e = new Error(fbErrorObj.message);
		e.type = "Facebook" + fbErrorObj.type;
		return e;
	};

	var add = function () {

		var originalAsyncInit = window.fbAsyncInit;
		
		window.fbAsyncInit = function() {
			if (originalAsyncInit && _.isFunction(originalAsyncInit)) {
				try {
					originalAsyncInit();
				} catch (e) {
					// I don't know what this code is, it's totally possible it'll break
				}
			}
			
			initDeferred.resolve();
			vent.trigger("ready");
		};

		(function(d, s, id){
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement(s); js.id = id;
		 js.src = "//connect.facebook.net/en_US/all.js";
		 fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	};

	var appId;
	var setApp = function (id) {
		if (appId) {
			return false;
		}

		appId = id;

		initDeferred.done(function () {
			FB.init({
				appId: appId,
				status: true
			});
			vent.trigger("app:init");

			FB.getLoginStatus(function (response) {
				setLoginStatus(response.status);

				if (response.status == "connected") {
					getProfile(function (profile) {
						readyDeferred.resolve();
					});
				} else {
					readyDeferred.resolve();
				}
			});
		});
	};
	var getApp = function () {
		return appId;
	};

	var loginStatus;
	var setLoginStatus = function (status) {
		loginStatus = status;
	};
	var getLoginStatus = function () {
		return loginStatus;
	};

	
	var getAuthResponse = function () {
		return FB.getAuthResponse();
	};

	var userFields = [
		'id',
		'age_range',
		'bio',
		'birthday',
		'currency',
		'education',

		'email',
		'name',
		'name_format',
		'first_name',
		'middle_name',
		'last_name',

		'gender',
		'hometown',
		'link',
		'locale',
		'location',

		'political',
		'relationship_status',
		'religion',
		'significant_other',
		'username',
		'website',

		'permissions'
	];
	var profile;
	var getProfile = function (cb) {
		if (profile) {
			return cb(profile);
		}

		FB.api('/me', {fields: userFields}, function (response) {
			if (response.error) {
				throw wrapError(response.error);
			}
			profile = response;
			try {
				setPermissions(response);
			} catch (e) {
				if (e.type !== "PermissionsError") {
					throw e;
				}
			}

			cb(response);
		});
	};

	var permissions;

	var defaultPermissions = [
		'email',
		'publish_actions'
	];
	var setPermissions = function (profile) {
		if (profile.permissions 
			&& profile.permissions.data
			&& profile.permissions.data[0]) {

			permissions = profile.permissions.data[0];
		} else {
			var e = new Error("Profile object does not have permissions");
			e.type = "PermissionsError";
			throw e;
		}
	};
	var getPermissions = function ( extraPermissions ) {
		if (!extraPermissions) {
			return defaultPermissions.slice();
		}
		return _.union(defaultPermissions, extraPermissions);
	};
	var hasPermissions = function ( permissionsArr ) {
		if (!permissions) {
			return false;
		}
		return _.every(permissionsArr, function (p) {
			return !!permissions[ p ];
		});
	};

	Facebook = {
		vent: vent,
		wrapError: wrapError,
		
		add: add,
		ready: ready,

		setApp: setApp,
		getApp: getApp,

		getProfile: getProfile,

		getLoginStatus: getLoginStatus,
		getAuthResponse: getAuthResponse,

		getPermissions: getPermissions,
		hasPermissions: hasPermissions
	};
})();