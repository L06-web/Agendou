document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  if (email === "admin@teste.com.br" && senha === "123456") {
    window.location.href = 'index1.html';
  } else {
    Swal.fire("Erro", "Credenciais inválidas", "error");
  }
});
