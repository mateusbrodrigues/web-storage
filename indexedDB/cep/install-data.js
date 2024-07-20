async function extractCEPsOnly() {
  const response = await fetch("./CEPs.txt");
  const textData = await response.text();
  const lines = textData.split("\n");
  const extractCEP = (line) => line.split(";")[3];
  const cepList = lines.map(extractCEP);
  return cepList;
}

export async function fetchCEPData(cep) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  // const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  const data = await response.json();
  return data;
}

export function cepFactory(cepData) {
  return {
    zipCode: cepData.cep.replace("-", ""),
    state: cepData.uf || cepData.state,
    location: cepData.localidade || cepData.city,
    publicPlace: cepData.logradouro || cepData.street,
    neighborhood: cepData.bairro || cepData.neighborhood,
    phoneCode: cepData.ddd || "",
  };
}

export async function installData() {
  const cepList = await extractCEPsOnly();
  const promiseList = await Promise.allSettled(cepList.map(fetchCEPData));
  const onlyFulfilled = (result) => result.status === "fulfilled";
  const onlyValues = (result) => result.value;
  const cepListData = promiseList.filter(onlyFulfilled).map(onlyValues);
  const onlyDataWithCEP = (cepData) => !!cepData.cep;
  const cepMappedList = cepListData.filter(onlyDataWithCEP).map(cepFactory);

  const { default: Dexie } = await import(
    "https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm"
  );
  const db = new Dexie("zipCodeDatabase");

  db.version(2).stores({
    zipCode: "&zipCode,location",
  });

  return db.zipCode.bulkPut(cepMappedList);
}
