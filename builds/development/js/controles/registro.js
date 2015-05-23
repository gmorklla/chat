myApp.controller('ControlRegistro',
	function ($scope, $firebaseAuth, $location, Autenticacion) {
		var ref = new Firebase("https://chatiemporealapp.firebaseio.com/");
		var auth = $firebaseAuth(ref);

		$scope.login = function () {
			Autenticacion.login($scope.user)
			.then(function (user) {
				$location.path('/chat');
			}).catch(function (error) {
				$scope.mensaje = error.message;
			});
		}; // login

		$scope.registro = function () {
			Autenticacion.registro($scope.user)
			.then(function (user) {
				Autenticacion.login($scope.user);
				$location.path('/chat');
			}).catch(function (error) {
				$scope.mensaje = error.message;
			});
		}; // registro
	}
);