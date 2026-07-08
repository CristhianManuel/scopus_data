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
    { clave: "farmacia-y-bioquimica-bachiller", handle: "20.500.12866/18901" },
    { clave: "farmacia-y-bioquimica-titulo-profesional-en-farmacia-y-bioquimica", handle: "20.500.12866/18902" },
    { clave: "farmacia-y-bioquimica-maestria-en-tecnologia-farmaceutica", handle: "20.500.12866/18927" },
    { clave: "gestion-de-desarrollo-global-maestria-en-salud-publica-y-salud-global", handle: "20.500.12866/19020" },
    { clave: "ingenieria-ambiental-titulo-profesional-en-ingenieria-ambiental", handle: "20.500.12866/18909" },
    { clave: "ingenieria-ambiental-maestria-en-ciencias-ambientales-con-mencion-en-ecologia-y-gestion-ambiental", handle: "20.500.12866/18928" },
    { clave: "ingenieria-biomedica-titulo-profesional-en-ingenieria-biomedica", handle: "20.500.12866/18907" },
    { clave: "ingenieria-informatica-titulo-profesional-en-ingenieria-informatica", handle: "20.500.12866/18908" },
    { clave: "medicina-bachiller-en-medicina", handle: "20.500.12866/18812" },
    { clave: "medicina-titulo-profesional-en-medicina", handle: "20.500.12866/18813" },
    { clave: "medicina-titulo-de-segunda-especialidad-profesional-en-la-subespecialidad", handle: "20.500.12866/18771" },
    { clave: "medicina-maestria", handle: "20.500.12866/18694" },
    { clave: "medicina-doctorado", handle: "20.500.12866/18693" },
    { clave: "medicina-veterinaria-y-zootecnia-titulo-profesional-de-medicina-veterinaria-y-zootecnia", handle: "20.500.12866/18934" },
    { clave: "medicina-veterinaria-y-zootecnia-titulo-de-segunda-especialidad", handle: "20.500.12866/18933" },
    { clave: "medicina-veterinaria-y-zootecnia-maestria-en-ciencias-veterinarias-con-mencion-en-animales-de-compania", handle: "20.500.12866/18940" },
    { clave: "medicina-veterinaria-y-zootecnia-maestria-en-epidemiologia-y-salud-publica-en-veterinaria", handle: "20.500.12866/18936" },
    { clave: "medicina-veterinaria-y-zootecnia-maestria-en-investigacion-en", handle: "20.500.12866/18937" },
    { clave: "medicina-veterinaria-y-zootecnia-maestria-en-parasitologia-en-animales-domesticos-y-silvestres", handle: "20.500.12866/18938" },
    { clave: "medicina-veterinaria-y-zootecnia-maestria-en-sanidad-acuicola", handle: "20.500.12866/18939" },
    { clave: "nutricion-bachiller-en-nutricion", handle: "20.500.12866/18903" },
    { clave: "nutricion-titulo-profesional-en-nutricion", handle: "20.500.12866/18904" },
    { clave: "psicologia-titulo-profesional-de-psicologia", handle: "20.500.12866/18989" },
    { clave: "psicologia-titulo-de-segunda-especialidad", handle: "20.500.12866/18988" },
    { clave: "psicologia-maestria-en-psicologia-educacional", handle: "20.500.12866/18999" },
    { clave: "psicologia-maestria-en-psicologia-clinica", handle: "20.500.12866/18998" },
    { clave: "quimica-bachiller-en-quimica", handle: "20.500.12866/18905" },
    { clave: "quimica-titulo-profesional-en-quimica", handle: "20.500.12866/18906" },
    { clave: "quimica-maestria-en-quimica", handle: "20.500.12866/18925" },
    { clave: "tecnologia-medica-laboratorio-clinico-y-anatomia-patologica-titulo-profesional", handle: "20.500.12866/18757" },
    { clave: "tecnologia-medica-radiologia-titulo-profesional", handle: "20.500.12866/18756" },
    { clave: "tecnologia-medica-terapia-de-audicion-voz-y-lenguaje-titulo-profesional", handle: "20.500.12866/18760" },
    { clave: "tecnologia-medica-terapia-fisica-y-rehabilitacion", handle: "20.500.12866/18758" },
    { clave: "tecnologia-medica-terapia-ocupacional-titulo-profesional", handle: "20.500.12866/18754" },
    { clave: "enfermeria-bachiller", handle: "20.500.12866/18887" },
    { clave: "enfermeria-titulo-profesional", handle: "20.500.12866/18888" },
    { clave: "enfermeria-titulo-de-segunda-especialidad-en-enfermeria", handle: "20.500.12866/18624" },
    { clave: "enfermeria-maestria-en-enfermeria", handle: "20.500.12866/18621" },
    { clave: "enfermeria-maestria-en-gestion-del-cuidado-en-enfermeria", handle: "20.500.12866/18622" },
    { clave: "estomatologia-titulo-profesional-en-estomatologia", handle: "20.500.12866/18889" },
    { clave: "estomatologia-titulo-de-segunda-especialidad-en-estomatologia", handle: "20.500.12866/18667" },
    { clave: "estomatologia-maestria-en-estomatologia", handle: "20.500.12866/18653" },
    { clave: "estomatologia-maestria-en-endodoncia", handle: "20.500.12866/18652" },
    { clave: "estomatologia-maestria-en-ortodoncia", handle: "20.500.12866/18656" },
    { clave: "estomatologia-maestria-en-estomatologia-con-mencion-en-rehabilitacion-oral", handle: "20.500.12866/18659" },
    { clave: "estomatologia-doctorado-en-estomatologia", handle: "20.500.12866/18650" },
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
