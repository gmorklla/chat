myApp.factory('Autenticacion', [
	'$firebaseObject',
	'$firebaseAuth',
	'$rootScope',
	'$routeParams',
	'$location',
	function ($firebaseObject, $firebaseAuth, $rootScope, $routesParams, $location) {
	
		var ref = new Firebase("https://chatiemporealapp.firebaseio.com/");
		var auth = $firebaseAuth(ref);

		auth.$onAuth(function (authUser) {
			if(authUser){
				var ref = new Firebase('https://chatiemporealapp.firebaseio.com/users/' + authUser.uid);
				var user = $firebaseObject(ref);
				$rootScope.usuarioActual = user;
			} else{
				$rootScope.usuarioActual = '';
			}
		});

		var miObjeto = {
			login: function (user) {
				return auth.$authWithPassword({
					email: user.email,
					password: user.password
				}); // authWithPassword
			}, // login
			logout: function (user) {
				return auth.$unauth(); // unauth
			}, // logout
			registro: function (user) {
				return auth.$createUser({
					email: user.email,
					password: user.password
				}).then(function (regUser) {
					var ref = new Firebase("https://chatiemporealapp.firebaseio.com/");
					var usuariosFirebase = ref.child("users");

					var infoUsuario = {
						fecha : Firebase.ServerValue.TIMESTAMP,
						regUser : regUser.uid,
						nombre : user.nombre,
						apellido : user.apellido,
						email : user.email,
						password : user.password
					}; // info de Usuario
					usuariosFirebase.child(regUser.uid).set(infoUsuario);
				}); // Promesa
			}, // registro
			requiereAuth: function () {
				return auth.$requireAuth(); // requiereAuth
			}, // Autenticación requerida
			esperaPorAuth: function () {
				return auth.$waitForAuth(); // waitForAuth
			} // Espera por Autenticación
		}; // Objeto temporal que se dará como resultado

		return miObjeto;
	}
]); // myApp Factory