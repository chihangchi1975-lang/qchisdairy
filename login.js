function toggleHint() {
  document.getElementById("hint").classList.toggle("show");
}

function checkPassword() {
  const pass = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (pass === "1507") location.href = "home1.html";
  else error.textContent = "Wrong password...";
}
