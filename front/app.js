document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formulario");

  if (formulario) {
    formulario.addEventListener("submit", validarFormulario);
  }
});

function validarFormulario(event) {
  event.preventDefault(); // Evita el envío del formulario para validar primero;

  // Resetea los estilos
  resetearValidaciones();

  const mensajesError = [];

  const inputNombre = document.getElementById("nombre");
  if (inputNombre.value.length === 0) {
    inputNombre.classList.add("error");
    mensajesError.push("⚠️ Por favor, ingresa tu nombre.\n");
  }

  // Validar Correo (un solo @ y dominio válido)
  const inputCorreo = document.getElementById("correo");
  if (!esCorreoValido(inputCorreo.value)) {
    inputCorreo.classList.add("error");
    mensajesError.push("⚠️ Por favor, ingresa un correo válido.\n");
  }

  // Validar Prefijo y Teléfono
  const inputPrefijo = document.getElementById("prefijo");
  if (!esPrefijoValido(inputPrefijo.value)) {
    inputPrefijo.classList.add("error");
    mensajesError.push("⚠️ Por favor, ingresa un prefijo válido.\n");
  }

  const inputTelefono = document.getElementById("telefono");
  if (!esTelefonoValido(inputTelefono.value)) {
    inputTelefono.classList.add("error");
    mensajesError.push("⚠️ Por favor, ingresa un teléfono válido.\n");
  }

  // Validar Términos y Condiciones
  const inputTerminos = document.getElementById("terminos");
  if (!inputTerminos.checked) {
    inputTerminos.classList.add("error");
    mensajesError.push("⚠️ Debes aceptar los términos y condiciones.\n");
  }

  const mensajeValidacion = document.getElementById("mensaje-validacion");

  if (mensajesError.length > 0) {
    // Mostrar mensaje de error si hubo algún problema
    mensajeValidacion.classList.add("error");
    mensajeValidacion.innerText = mensajesError.join(" ");
  } else {
    const botonSubmit = document.getElementById("submit");
    botonSubmit.classList.add("oculto");

    mensajeValidacion.classList.add("valido");
    mensajeValidacion.innerText = "Gracias por suscribirte! 😊";
  }
}

function esCorreoValido(correo) {
  // Fuente: https://regex101.com/library/SOgUIV
  // The email couldn't start or finish with a dot
  // The email shouldn't contain spaces into the string
  // The email shouldn't contain special chars (<:, *,ecc)
  // The email could contain dots in the middle of mail address before the @
  // The email could contain a double doman ( '.de.org' or similar rarity)

  const correoRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  return correoRegex.test(correo);
}

function esPrefijoValido(prefijo) {
  const tresDigitosSoloNumeros = /^\d{3}$/;
  return tresDigitosSoloNumeros.test(prefijo);
}

function esTelefonoValido(telefono) {
  const ochoDigitosSoloNumeros = /^\d{8}$/;
  return ochoDigitosSoloNumeros.test(telefono);
}

function resetearValidaciones() {
  // Resetea los estilos de TODOS los inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("error");
  });

  // Resetea el banner de error
  const bannerError = document.getElementById("mensaje-validacion");
  bannerError.classList.remove("error");
  bannerError.classList.remove("valido");
  bannerError.innerText = "";
}
