import {state} from "../state.ts";

export function resultView(params: { goTo: (arg0: string) => void; }): HTMLDivElement {

    let gameData = localStorage.getItem('PPTGameData');
    // Si existe el dato en el storage, lo guarda en el estado y lo retorna.
    if(!gameData){
        params.goTo('/play');
    }

    let localState = state.getState();
    let playerOption = localState.player.playedOption;
    let machineOption = localState.machine.playedOption;
    let machineScore = localState.machine.score;
    let playerScore = localState.player.score;
    let resultado = machineScore > playerScore ? 'perdedor' : 'ganador';

    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('result');
    div.innerHTML = `
        <div style="transform: rotateZ(180deg)"></div>
        <div></div>    
        <div class="backgroundColor"></div>
        
        <div class="container">
            <img src="/img/${resultado}.svg" alt="${resultado}">
            <div class="score">
                <p>Score</p>
                <p>Jugador: ${playerScore}</p>
                <p>Máquina: ${machineScore}</p>
            </div>
            <button>Volver a Jugar</button>
        </div>    
    `;
    const container = div.querySelector('.backgroundColor')!;
    container.classList.add(`${resultado}`);
    // Agrega la clase correspondiente a la imagen de la última jugada de la máquina y del jugador
    div.children[0].classList.add(`${machineOption}`);
    playerOption !== '' ? div.children[1].classList.add(`${playerOption}`): null;

    const button = div.querySelector('button')!;
    button.onclick = () => {
        state.resetState();
        params.goTo('/play');
    }
    return div;
}