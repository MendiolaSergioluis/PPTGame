import {state} from "../state.ts";

export function instructionsView(params: { goTo: (arg0: string) => void; }): HTMLDivElement {
    state.resetState()
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('instructions');
    div.classList.add('background');
    div.innerHTML = `
        <div class="content">
            <h1>Presiona jugar y elige: piedra, papel o tijera antes de que pasen los 3 segundos.</h1>
            <button>jugar</button>
        </div>
        <div class="images">
            <img src="/img/tijera.svg" alt="tijera" class="image scissors">
            <img src="/img/piedra.svg" alt="piedra" class="image rock">
            <img src="/img/papel.svg" alt="papel" class="image paper">
        </div>
    `;
    const buttonStart = div.querySelector('button')!;
    buttonStart.onclick = () => {
        params.goTo('/play');
    }
    return div;
}