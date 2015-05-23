myApp.controller('ControlStatus', function ($scope, $location, Autenticacion) {
	$scope.logout = function(){
		Autenticacion.logout();
		$location.path('/login');
	}; // logout
}); // ControlStatus