const alert = document.querySelector(".login__alert");
const button = document.querySelector(".login__button");
const inputs = document.querySelectorAll(".login__input");
const inputIcon = document.querySelector(".login__input__icon");
const username = "user";
const password = "pass";
const timeOut = 30;
let attempts = 5;

button.addEventListener("click", (e) => {
  e.preventDefault();
  inputUsername = document.getElementById("username").value;
  inputPassword = document.getElementById("password").value;

  if (inputUsername !== username || inputPassword !== password) {
    document.getElementById("username").style.borderColor = "red";
    document.getElementById("password").style.borderColor = "red";

    if (attempts > 0) attempts--;
    document.getElementById("attempts").innerHTML = attempts;
    alert.classList.remove("login__alert--hidden");

    if (attempts === 0) {
      lockOut(timeOut);
    }
  } else {
    window.location = "./dashboard.html";
  }
});

inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.style.borderColor = "#3b6cc8";
  });
});

inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    e.target.style.borderColor = "#dfdee2";
  });
});

inputIcon.addEventListener("click", (e) => {
  if (document.querySelector("#password").getAttribute("type") === "password")
    document.querySelector("#password").setAttribute("type", "text");
  else document.querySelector("#password").setAttribute("type", "password");
});

function lockOut(s) {
  const attemptLimit = document.querySelector(".login__attempt-limit");
  attemptLimit.classList.remove("login__attempt-limit--hidden");

  document.getElementById("username").style.borderColor = "#dfdee2";
  document.getElementById("username").disabled = true;

  document.getElementById("password").style.borderColor = "#dfdee2";
  document.getElementById("password").disabled = true;

  document.getElementById("login__button").disabled = true;
  document.getElementById("login__button").style.background = "grey";

  document.getElementById("timeout").innerHTML = s;

  setInterval(() => {
    s--;
    document.getElementById("timeout").innerHTML = s;
  }, 1000);

  setTimeout(() => {
    location.reload();
  }, s * 1000);
}
