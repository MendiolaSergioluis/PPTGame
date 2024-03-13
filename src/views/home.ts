import {state} from "../state.ts";

export function homeView(params: { goTo: (arg0: string) => void; }): HTMLDivElement {
    state.resetState()
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('home');
    div.classList.add('background');
    div.innerHTML = `
        <div class="content">
            <h1>Piedra<br>Pagel <span>ó</span><br>Tijera</h1>
            <button>Empezar</button>
        </div>
        <div class="images">
            <img src="/img/tijera.svg" alt="tijera" class="image scissors">
            <img src="/img/piedra.svg" alt="piedra" class="image rock">
            <img src="/img/papel.svg" alt="papel" class="image paper">
        </div>
    `;
    const buttonStart = div.querySelector('button')!;
    buttonStart.onclick = () => {
        params.goTo('/instructions');
    }

    return div;
}