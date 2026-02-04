
const time = document.getElementById("time");

time.innerText = "Deployed at: " + new Date().toLocaleString();

function showMessage() {
  alert("🎉 CI/CD is working successfully!");
}
