// Importa las funciones que renderizan las vistas
import {homeView} from "./views/home.ts";
import {instructionsView} from "./views/instructions.ts";
import {playView} from "./views/play.ts";
import {resultView} from "./views/result.ts";

type Route = {
    path: RegExp,
    component: Function
};

// Filtros y vistas específicas del proyecto
const routes: Route[] = [
    {
        path: /\/home/,
        component: homeView,
    },
    {
        path: /\/instructions/,
        component: instructionsView,
    },
    {
        path: /\/play/,
        component: playView,
    },
    {
        path: /\/result/,
        component: resultView,
    }
];

// Inicia el router desde 'main.js' con el elemento principal.
export function initRouter(rootEl: Element): void {

    function router(route: string): void {
        // Redirecciona al home cuando no se provee ningún uri
        if (route === '/' || route === '') {
            route = '/home';
            history.pushState({}, "", route);
        }

        // Recorre la lista de rutas
        routes.forEach((r: Route) => {

            // Si la ruta es invocada reescribe el elemento raíz con la vista seleccionada.
            if (r.path.test(route)) {
                const viewEl = r.component({goTo: goTo});
                rootEl.innerHTML = '';
                rootEl.appendChild(viewEl);
            }
        });
    }

    // Función utilitaria que pasa a la vista seleccionada para poder navegar a otras rutas.
    function goTo(uri: string): void {
        history.pushState({}, "", uri);
        router(uri);
    }


    // Ejecuta el router con la ruta tomada de la url
    router(location.pathname);

    // Escucha el evento popstate para actualizar la vista cuando se navega hacia atrás o adelante.
    window.addEventListener('popstate', () => {
        router(location.pathname);
    });
}

