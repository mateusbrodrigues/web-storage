import { installData } from "./install-data.js";

const button = document.querySelector("button");
button.addEventListener("click", async () => {
  console.log("install data...");
  button.disabled = true;
  button.setAttribute("aria-busy", true);
  await installData();
  button.removeAttribute("aria-busy");
});
