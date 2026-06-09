// ============================
// TUTORIAL INICIAL
// ============================

const tutorialText =
document.getElementById("tutorialText");

const btnTutorial =
document.getElementById("btnSiguienteTutorial");

const overlay =
document.getElementById("overlay");

const tutoriales = [

"Esta aplicación te ayudará a proteger tus datos personales.",

"Aprenderás a revisar los permisos de las aplicaciones instaladas en tu dispositivo.",

"Conocerás tus derechos y responsabilidades digitales.",

"Podrás registrar tus revisiones de privacidad y llevar un seguimiento."

];

let pasoTutorial = 0;

if(
localStorage.getItem("tutorialCompletado")
=== "si"
){

overlay.style.display = "none";

}

btnTutorial.addEventListener("click",()=>{

pasoTutorial++;

if(pasoTutorial < tutoriales.length){

tutorialText.textContent =
tutoriales[pasoTutorial];

}else{

overlay.style.display = "none";

localStorage.setItem(
"tutorialCompletado",
"si"
);

}

});

// ============================
// ELEMENTOS PRINCIPALES
// ============================

const adultoBtn =
document.getElementById("adultoBtn");

const menorBtn =
document.getElementById("menorBtn");

const perfilSection =
document.getElementById("perfilSection");

const menuPrincipal =
document.getElementById("menuPrincipal");

const saludoUsuario =
document.getElementById("saludoUsuario");

// ============================
// INICIAR APP
// ============================

function iniciarAplicacion(){

    perfilSection.classList.add(
    "oculto"
    );

    menuPrincipal.classList.remove(
    "oculto"
    );

    cargarTutoriales();

}

// ============================
// SELECCIONAR PERFIL
// ============================

adultoBtn.addEventListener("click",()=>{

document.body.classList.remove(
"modo-menor"
);

document.body.classList.add(
"modo-adulto"
);

localStorage.setItem(
"tipoUsuario",
"adulto"
);

saludoUsuario.textContent =
"Bienvenido";

iniciarAplicacion();

});

menorBtn.addEventListener("click",()=>{

document.body.classList.remove(
"modo-adulto"
);

document.body.classList.add(
"modo-menor"
);

localStorage.setItem(
"tipoUsuario",
"menor"
);

saludoUsuario.textContent =
"Hola, Bienvenido";

iniciarAplicacion();

});

// ============================
// CARGAR PERFIL GUARDADO
// ============================

function cargarPerfilGuardado(){

    const usuario =
    localStorage.getItem(
    "tipoUsuario"
    );

    if(!usuario){
        return;
    }

    perfilSection.classList.add(
    "oculto"
    );

    menuPrincipal.classList.remove(
    "oculto"
    );

    if(usuario === "adulto"){

        document.body.classList.add(
        "modo-adulto"
        );

        saludoUsuario.textContent =
        "Bienvenido";

    }

    if(usuario === "menor"){

        document.body.classList.add(
        "modo-menor"
        );

        saludoUsuario.textContent =
        "Hola, Bienvenido";

    }

    cargarTutoriales();

}

cargarPerfilGuardado();

cargarPerfilGuardado();

// ============================
// NAVEGACIÓN
// ============================

function mostrarSeccion(id){

    const secciones =
    document.querySelectorAll(".contenido");

    secciones.forEach(sec => {
        sec.classList.add("oculto");
    });

    document
    .getElementById(id)
    .classList.remove("oculto");

}

// ============================
// REGISTRAR REVISIONES
// ============================

function registrarRevision(tipo){

const fecha =
new Date().toLocaleDateString();

localStorage.setItem(
tipo,
"Revisado"
);

localStorage.setItem(
"ultimaRevision",
fecha
);

localStorage.setItem(
"ultimaRevisionISO",
new Date().toISOString()
);

actualizarProgreso();

alert(
"Revisión registrada correctamente."
);

}

// ============================
// ACTUALIZAR PROGRESO
// ============================

function actualizarProgreso(){

const camara =
localStorage.getItem(
"camara"
);

const microfono =
localStorage.getItem(
"microfono"
);

const ubicacion =
localStorage.getItem(
"ubicacion"
);

const fecha =
localStorage.getItem(
"ultimaRevision"
);

document.getElementById(
"estadoCamara"
).textContent =
camara || "Pendiente";

document.getElementById(
"estadoMicrofono"
).textContent =
microfono || "Pendiente";

document.getElementById(
"estadoUbicacion"
).textContent =
ubicacion || "Pendiente";

document.getElementById(
"ultimaRevision"
).textContent =
fecha || "Sin registros";

}

actualizarProgreso();

// ============================
// RECORDATORIO 90 DÍAS
// ============================

function verificarRecordatorio(){

const ultima =
localStorage.getItem(
"ultimaRevisionISO"
);

if(!ultima){
return;
}

const ultimaFecha =
new Date(ultima);

const hoy =
new Date();

const dias =
(hoy - ultimaFecha)
/ (1000*60*60*24);

if(dias >= 90){

alert(
"Recordatorio: Debes revisar nuevamente los permisos de tus aplicaciones."
);

}

}

verificarRecordatorio();

// ============================
// REINICIAR REGISTROS
// ============================

function reiniciarDatos(){

const confirmar =
confirm(
"¿Deseas borrar todos los registros?"
);

if(!confirmar){
return;
}

localStorage.removeItem(
"camara"
);

localStorage.removeItem(
"microfono"
);

localStorage.removeItem(
"ubicacion"
);

localStorage.removeItem(
"ultimaRevision"
);

localStorage.removeItem(
"ultimaRevisionISO"
);

actualizarProgreso();

alert(
"Datos eliminados."
);

}

// ============================
// CAMBIAR PERFIL
// ============================

function cambiarPerfil(){

const confirmar =
confirm(
"¿Deseas cambiar de perfil?"
);

if(!confirmar){
return;
}

localStorage.removeItem(
"tipoUsuario"
);

document.body.classList.remove(
"modo-adulto"
);

document.body.classList.remove(
"modo-menor"
);

menuPrincipal.classList.add(
"oculto"
);

perfilSection.classList.remove(
"oculto"
);

}

// ============================
// TUTORIALES POR PERFIL
// ============================

function cargarTutoriales(){

    const contenedor =
    document.getElementById(
    "contenidoTutoriales"
    );

    if(!contenedor){
        return;
    }

    const usuario =
    localStorage.getItem(
    "tipoUsuario"
    );

    if(usuario === "adulto"){

        contenedor.innerHTML = `

        <div class="card">

            <h3>🔒 Tutorial 1: Protege tus datos personales</h3>

            <p>
            Aprende qué información no debes compartir en Internet.
            </p>

            <video controls width="100%">
                <source src="videos/adulto-datos.mp4" type="video/mp4">
            </video>

        </div>

        <div class="card">

            <h3>📱 Tutorial 2: Revisar permisos paso a paso</h3>

            <p>
            Aprende cómo revisar los permisos de las aplicaciones.
            </p>

            <video controls width="100%">
                <source src="videos/adulto-permisos.mp4" type="video/mp4">
            </video>

        </div>

        <div class="card">

            <h3>⚠️ Tutorial 3: Detectar fraudes digitales</h3>

            <p>
            Identifica mensajes falsos y enlaces peligrosos.
            </p>

            <video controls width="100%">
                <source src="videos/adulto-fraudes.mp4" type="video/mp4">
            </video>

        </div>

        `;

    }

    if(usuario === "menor"){

        contenedor.innerHTML = `

        <div class="card">

            <h3>🧒 Tutorial 1: Mis datos son importantes</h3>

            <p>
            Aprende qué información personal nunca debes compartir.
            </p>

            <video controls width="100%">
                <source src="videos/menor-datos.mp4" type="video/mp4">
            </video>

        </div>

        <div class="card">

            <h3>📷 Tutorial 2: Permisos de aplicaciones</h3>

            <p>
            Conoce cuándo una aplicación necesita usar la cámara o el micrófono.
            </p>

            <video controls width="100%">
                <source src="videos/menor-permisos.mp4" type="video/mp4">
            </video>

        </div>

        <div class="card">

            <h3>🌐 Tutorial 3: Navega seguro en Internet</h3>

            <p>
            Aprende a protegerte cuando navegas o juegas en línea.
            </p>

            <video controls width="100%">
                <source src="videos/menor-internet.mp4" type="video/mp4">
            </video>

        </div>

        `;

    }

}

// ============================
// ABRIR GUÍAS DE PRIVACIDAD
// ============================

function abrirCamara(){

    alert(
    "📷 Cámara\n\nAndroid:\nConfiguración > Privacidad > Administrador de permisos > Cámara\n\niPhone:\nAjustes > Privacidad y seguridad > Cámara"
    );

    registrarRevision("camara");

}

function abrirMicrofono(){

    alert(
    "🎤 Micrófono\n\nAndroid:\nConfiguración > Privacidad > Administrador de permisos > Micrófono\n\niPhone:\nAjustes > Privacidad y seguridad > Micrófono"
    );

    registrarRevision("microfono");

}

function abrirUbicacion(){

    alert(
    "📍 Ubicación\n\nAndroid:\nConfiguración > Ubicación > Permisos de aplicaciones\n\niPhone:\nAjustes > Privacidad y seguridad > Localización"
    );

    registrarRevision("ubicacion");

}

// ============================
// SERVICE WORKER
// ============================

if("serviceWorker" in navigator){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker.register(
"./service-worker.js"
);

}
);

}
function abrirCamara(){

    alert(
    "Ve a:\n\nConfiguración > Privacidad > Cámara"
    );

    window.open(
    "app-settings:",
    "_blank"
    );

}
