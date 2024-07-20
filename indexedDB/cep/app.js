import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm";

async function extractCEPsOnly() {
  const response = await fetch("./CEPs.txt");
  const textData = await response.text();
  const lines = textData.split("\n");
  const extractCEP = (line) => line.split(";")[3];
  const cepList = lines.map(extractCEP);
  return cepList;
}

async function fetchCEPData(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  console.log("response data: ", data);
  return data;
}

const cepList = await extractCEPsOnly();
console.log(cepList[0]);
const cepData = await fetchCEPData(cepList[0]);
console.log(cepData);

// const db = new Dexie('zipCodeDatabase');

// db.version(1).stores({
//   zipCode: '++id,cep,localidade',
// });

// // {
// //   "cep": "37537-144",
// //   "logradouro": "Rua Três",
// //   "complemento": "",
// //   "unidade": "",
// //   "bairro": "Viana",
// //   "localidade": "Santa Rita do Sapucaí",
// //   "uf": "MG",
// //   "ibge": "3159605",
// //   "gia": "",
// //   "ddd": "35",
// //   "siafi": "5191"
// // }

// db.zipCode.add({
//   zipCode: data.cep.replace('-', ''),
//   state: data.uf,
//   location: data.localidade,
//   publicPlace: data.logradouro,
//   neighborhood: data.bairro,
//   phoneCode: data.ddd,
// });
