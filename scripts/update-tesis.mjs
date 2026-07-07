import { writeFile } from "node:fs/promises";

const COLECCIONES = [
    { clave: "administracion-maestria-en-comportamiento-organizacional-con-mencion-en-gestion-de-recursos-humanos", handle: "20.500.12866/18995" },
    { clave: "administracion-maestria-en-gerencia-de-proyectos-y-programas-sociales", handle: "20.500.12866/19017" },
    { clave: "administracion-maestria-en-politicas-y-gestion-de-la-ciencia-tecnologia-e-innovacion", handle: "20.500.12866/18612" },
    { clave: "administracion-en-salud-titulo-profesional-de-administracion-en-salud", handle: "20.500.12866/19009" },
    { clave: "administracion-en-salud-maestria-en-gerencia-de-los-servicios-de-salud", handle: "20.500.12866/19024" },
    { clave: "administracion-en-salud-maestria-en-gerencia-en-salud", handle: "20.500.12866/19018" },
    { clave: "administracion-en-salud-maestria-en-salud-publica", handle: "20.500.12866/19019" },
    { clave: "administracion-en-salud-maestria-en-salud-publica-con-mencion-en-gestion-de-servicios-de-salud", handle: "20.500.12866/19021" },
    { clave: "administracion-en-salud-doctorado-en-salud-publica", handle: "20.500.12866/19014" },
    { clave: "administracion-en-salud-mba-en-gestion-de-salud", handle: "20.500.12866/18614" },
    { clave: "biologia-bachiller-en-biologia", handle: "20.500.12866/18899" },
    { clave: "biologia-titulo-profesional-en-biologia", handle: "20.500.12866/18900" },
    { clave: "biologia-maestria-en-bioquimica-y-biologia-molecular", handle: "20.500.12866/18917" },
    { clave: "biologia-maestria-en-microbiologia", handle: "20.500.12866/18924" },
    { clave: "biologia-maestria-en-ciencias-con-mencion-en-biologia", handle: "20.500.12866/18918" },
    { clave: "biologia-doctorado-en-ciencias-con-mencion-en-bioquimica-y-biologia-molecular", handle: "20.500.12866/18913" },
    { clave: "biologia-doctorado-en-ciencias-con-mencion-en-microbiologia", handle: "20.500.12866/18916" },
    { clave: "educacion-bachiller-en-educacion", handle: "20.500.12866/18954" },
    { clave: "educacion-titulo-profesional-de-educacion", handle: "20.500.12866/18955" },
    { clave: "educacion-titulo-de-segunda-especialidad-gestion-escolar-con-liderazgo-pedagogico", handle: "20.500.12866/18958" },
    { clave: "educacion-titulo-de-segunda-especialidad-acompanamiento-pedagogico", handle: "20.500.12866/18957" },
    { clave: "educacion-maestria-en-ciencias-de-la-educacion-con-mencion-en-didactica-de-la-ensenanza-de-las-ciencias-naturales-en-educacion-secundaria", handle: "20.500.12866/18973" },
    { clave: "educacion-maestria-en-docencia-profesional-tecnologica", handle: "20.500.12866/18974" },
    { clave: "educacion-maestria-en-educacion-con-mencion-en-didactica-de-la-lectura-y-la-escritura", handle: "20.500.12866/18975" },
    { clave: "educacion-maestria-en-educacion-con-mencion-en-docencia-e-investigacion-en-educacion-superior", handle: "20.500.12866/18976" },
    { clave: "educacion-maestria-en-educacion-con-mencion-en-gestion-del-cambio-en-instituciones-educativas", handle: "20.500.12866/18977" },
    { clave: "educacion-doctor-en-educacion", handle: "20.500.12866/18970" },
    { clave: "educacion-inicial-titulo-profesional-en-educacion-inicial", handle: "20.500.12866/18961" },
    { clave: "educacion-inicial-maestria-en-ciencias-de-la-educacion-con-mencion-en-didactica-de-la-ensenanza-de-educacion-inicial", handle: "20.500.12866/18971" },
    { clave: "educacion-inicial-titulo-profesional-en-educacion-inicial-intercultural-bilingue", handle: "20.500.12866/18962" },
    { clave: "educacion-intercultural-bilingue-titulo-profesional-en-educacion-primaria-intercultural-bilingue", handle: "20.500.12866/18965" },
    { clave: "educacion-intercultural-bilingue-maestria-en-educacion-intercultural-bilingue-con-mencion-en-gestion-e-innovacion", handle: "20.500.12866/18978" },
    { clave: "educacion-primaria-titulo-profesional-en-educacion-primaria", handle: "20.500.12866/18964" },
    { clave: "educacion-primaria-maestria-en-ciencias-de-la-educacion-con-mencion-en-didactica-de-la-ensenanza-de-las-ciencias-naturales-en-educacion-primaria", handle: "20.500.12866/18972" },
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
