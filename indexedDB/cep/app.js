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

async function getCepData(zipCode) {
  const { fetchCEPData, cepFactory } = await import("./install-data.js");
  const { default: Dexie } = await import(
    "https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm"
  );
  const db = new Dexie("zipCodeDatabase");
  db.version(2).stores({
    zipCode: "&zipCode,location",
  });
  const zipCodeData = await db.zipCode.get(zipCode);
  console.log(zipCodeData);
}

const form = document.querySelector("form");
form.addEventListener("submit", () => {
  getCepData(form.cep.value);
});

// TODO: improve this code
// TODO: fill the table
// TODO: if not find in the indexedDB fetch from the network and save into the table
