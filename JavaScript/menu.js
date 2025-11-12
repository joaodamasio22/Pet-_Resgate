document.addEventListener("DOMContentLoaded", () => {
  const menuLogin = document.getElementById("menuLogin");
  const menuUsuario = document.getElementById("menuUsuario");
  const inicialUsuario = document.getElementById("inicialUsuario");

  const usuarioNome = localStorage.getItem("usuarioNome");

  if (usuarioNome) {
    menuLogin.style.display = "none";
    menuUsuario.style.display = "flex";

    const inicial = usuarioNome.trim().charAt(0).toUpperCase();
    inicialUsuario.textContent = inicial;

    // Clique na inicial → sair
    inicialUsuario.addEventListener("click", () => {
      if (confirm("Deseja sair da conta?")) {
        localStorage.removeItem("usuarioNome");
        window.location.reload();
      }
    });
  } else {
    menuLogin.style.display = "flex";
    menuUsuario.style.display = "none";
  }
});