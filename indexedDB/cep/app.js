// import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm';

const linkToInstall = document.querySelector("a[href='#']");
linkToInstall.addEventListener("click", async () => {
  console.log("install data...");
  const { installData } = await import("./install-data.js");
  console.log(installData);
  alert("Will install");
  // button.disabled = true;
  // button.setAttribute('aria-busy', true);
  // await installData();
  // button.removeAttribute('aria-busy');
});

const form = document.querySelector("form");
form.addEventListener("submit", () => {
  alert("IM here!");
});
