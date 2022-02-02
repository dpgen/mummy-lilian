const userName = document.querySelector("#name");
const experience = document.querySelector("#experience");
const button = document.querySelector("#dp-gen-btn");

userName.addEventListener("input", (e) => {
  if (userName.value && experience.value) {
    button.disabled = false;
  }
});
experience.addEventListener("input", (e) => {
  if (userName.value && experience.value) {
    button.disabled = false;
    console.log();
  }
});
