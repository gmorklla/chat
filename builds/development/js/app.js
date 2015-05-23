var myApp = angular.module('myApp', [
	'ngRoute',
	'firebase',
	'controllers'
	]);

var controllers = angular.module('controllers', [
	'firebase'
	]);

myApp.run(['$rootScope', '$location', function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error){
		if(error === 'AUTH_REQUIRED'){
			$rootScope.mensaje = 'Debes iniciar sesión para tener acceso a ese contenido. ';
			$location.path('/login');
		}
	});
}]);

myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'ControlRegistro'
		}). // route /login
		when('/registro', {
			templateUrl: 'views/registro.html',
			controller: 'ControlRegistro'
		}). // route /registro
		when('/chat', {
			templateUrl: 'views/chat.html',
			controller: 'ControlChat',
			resolve: {
				currentAuth: function (Autenticacion) {
					return Autenticacion.requiereAuth();
				} // Autenticación requerida para entrar a /juntas
			}
		}). // route /juntas
		otherwise({
			redirectTo: '/login'
		}); // route redirectTo /login
	}
]);