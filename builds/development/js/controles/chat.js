myApp.controller('ControlChat', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray',
	function ($scope, $rootScope, $firebaseObject, $firebaseArray) {
		var ref = new Firebase("https://chatiemporealapp.firebaseio.com/mensajes/");
		var obj = $firebaseArray(ref);

		//obj.$bindTo($scope, "data");

		$scope.plusBtn = function plusBtn() {
			console.log($rootScope.usuarioActual);
			var datos = {
					id: $rootScope.usuarioActual.$id,
					nombre: $rootScope.usuarioActual.nombre,
					mensaje: $scope.nuevoMensaje,
					fecha : Firebase.ServerValue.TIMESTAMP
				};

				obj.$add(datos);
				$scope.nuevoMensaje = '';
			};
			$scope.nuevoMensaje = '';

		var refMensajes = new Firebase("https://chatiemporealapp.firebaseio.com/mensajes/");
		var listaMensajes = $firebaseArray(refMensajes);
		$scope.mensajes = listaMensajes;
	}]
); // ControlChat