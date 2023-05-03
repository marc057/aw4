$(document).ready(function () {

	$("#correoOK").hide();
	$("#correoMal").hide();
	$("#userOK").hide();
	$("#userMal").hide();

	$("#campoEmail").change(function () {
		const campo = $("#campoEmail"); // referencia jquery al campo
		campo[0].setCustomValidity(""); // limpia validaciones previas

		// validación html5, porque el campo es <input type="email" ...>
		const esCorreoValido = campo[0].checkValidity();
		if (esCorreoValido && correoValidoComplu(campo.val())) {
			// el correo es válido y acaba por @ucm.es: marcamos y limpiamos quejas
			$("#correoMal").hide();
			$("#correoVacio").hide();
			$("#correoOK").show();
			campo[0].setCustomValidity("");
		} else {
			// correo invalido: ponemos una marca y nos quejamos
			// ocultamos la marca de correo ok
			$("#correoOK").hide();
			// si el correo está vacío
			if (campo.val() == "") {
				$("#correoMal").hide();
				$("#correoVacio").show();
			}
			// si el correo no es valido
			else {
				$("#correoVacio").hide();
				$("#correoMal").show();
			}
			campo[0].setCustomValidity(
				"El correo debe ser válido y acabar por @ucm.es");
		}
	});


	$("#campoUser").change(function () {
		var url = "comprobarUsuario.php?user=" + $("#campoUser").val();
		$.get(url, usuarioExiste);
	});


	function correoValidoComplu(correo) {
		return correo.endsWith("@ucm.es");
	}

	function usuarioExiste(data, status) {
		if (status == "success") {
			if (data == 'disponible') {
				$("#userMal").hide();
				$("#userVacio").hide();
				$("#userOK").show();
			}
			else if (data == 'existe') {
				$("#userOK").hide();
				$("#userVacio").hide();
				$("#userMal").show();
				alert("El nombre seleccionado ya está en uso");
			}
			else {
				$("#userMal").hide();
				$("#userOK").hide();
				$("#userVacio").show();
			}
		}
	}
})