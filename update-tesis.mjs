import { writeFile } from "node:fs/promises";

const SCOPE_UUID = "67be0856-eb7d-4239-a046-80e06efd9bf1"; // Facultad de Enfermeria
const API_URL = `https://repositorio.upch.edu.pe/server/api/discover/search/objects?scope=${SCOPE_UUID}&sort=dc.date.accessioned,desc&size=5`;

const res = await fetch(API_URL);
if (!res.ok) {
    throw new Error(`DSpace respondio con estado ${res.status}`);
}
const data = await res.json();

const items = data?._embedded?.searchResult?._embedded?.objects || [];

const tesis = items
    .map(item => {
        const metadata = item._embedded?.indexableObject?.metadata;
        const title = metadata?.["dc.title"]?.[0]?.value;
        const handle = item._embedded?.indexableObject?.handle;
        return title && handle ? { title, handle } : null;
    })
    .filter(Boolean);

const salida = {
    actualizado: new Date().toISOString(),
    tesis
};

await writeFile("tesis.json", JSON.stringify(salida, null, 2));
console.log(`tesis.json actualizado con ${tesis.length} registros`);
