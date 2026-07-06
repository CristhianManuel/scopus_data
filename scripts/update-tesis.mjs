import { writeFile } from "node:fs/promises";

const COLECCIONES = [
    { clave: "enfermeria", handle: "20.500.12866/18617" },
    { clave: "educacion", handle: "20.500.12866/18943" },
    { clave: "psicologia", handle: "20.500.12866/18944" },

];

async function resolverUuid(handle) {
    const res = await fetch(`https://repositorio.upch.edu.pe/server/api/pid/find?id=${handle}`);
    if (!res.ok) throw new Error(`No se pudo resolver el handle ${handle} (status ${res.status})`);
    const data = await res.json();
    if (!data?.uuid) throw new Error(`El handle ${handle} no devolvio un uuid`);
    return data.uuid;
}

async function obtenerTesis(uuid) {
    const url = `https://repositorio.upch.edu.pe/server/api/discover/search/objects?scope=${uuid}&sort=dc.date.accessioned,desc&size=5`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`DSpace respondio con estado ${res.status}`);
    const data = await res.json();
    const items = data?._embedded?.searchResult?._embedded?.objects || [];

    return items
        .map(item => {
            const metadata = item._embedded?.indexableObject?.metadata;
            const title = metadata?.["dc.title"]?.[0]?.value;
            const itemHandle = item._embedded?.indexableObject?.handle;
            return title && itemHandle ? { title, handle: itemHandle } : null;
        })
        .filter(Boolean);
}

const colecciones = [];
for (const { clave, handle } of COLECCIONES) {
    const uuid = await resolverUuid(handle);
    const tesis = await obtenerTesis(uuid);
    colecciones.push({ clave, handle, tesis });
}

const salida = {
    actualizado: new Date().toISOString(),
    colecciones
};

await writeFile("tesis.json", JSON.stringify(salida, null, 2));
console.log(`tesis.json actualizado con ${colecciones.length} colecciones`);
