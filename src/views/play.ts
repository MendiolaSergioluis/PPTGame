import {state} from "../state.ts";

export function playView(params: { goTo: (arg0: string) => unknown; }): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('play');

    // Toma los datos del estado global y los guarda en una variable local
    let localState = state.getState();
    const playedImg: { [key: string]: string } = localState.playedImg;

    function render(){
        state.getState().runGame
            ? runGame()
            : params.goTo('/result');
        return div;
    }
    function runGame(){
        // Genera la vista inicial del juego
        div.classList.add('background');
        div.innerHTML = `
            <div class="content">
                <img src="/img/count-3.svg" alt="3s Remaining">
            </div>
            <div class="images">
                <button>
                <img src="/img/tijera.svg" alt="tijera" class="image scissors">
                </button>
                <button>
                <img src="/img/piedra.svg" alt="piedra" class="image rock">
                </button>
                <button>
                <img src="/img/papel.svg" alt="papel" class="image paper">
                </button>
            </div>
        `;

        // Genera la opción de la máquina
        let playerOption = localState.player.playedOption;
        let machineOption = localState.plays[Math.floor(Math.random() * 3)];

        // agrega la opción de la máquina al estado local
        localState.machine.playedOption = machineOption;

        // Agrega los botones para recibir la opción del jugador
        const buttons: NodeListOf<HTMLButtonElement>   = div.querySelectorAll('button');
        buttons.forEach((button: HTMLButtonElement) => {
            button.onclick = () => {
                button.parentElement!
                    .querySelectorAll('button')
                    .forEach((button)=>{
                    button.classList.add('disabled');
                    });
                button.classList.remove('disabled');
                playerOption = button.querySelector('img')
                    ? button.querySelector('img')!.alt
                    : '';
            }
        });

        // Cambia el contador de 3 a 2 después de 1 segundo
        setTimeout(() => {
            div.querySelector('.content')!.innerHTML = `
                <img src="/img/count-2.svg" alt="2s Remaining">
            `;
        }, 1500);


        // Muestra el resultado después de 3 segundos
        setTimeout(() => {
            div.innerHTML = `
                <img src="${playedImg[machineOption]}" style="transform: rotateZ(180deg) scale(1.5)" alt="${machineOption}">
                <img src="${playedImg[playerOption]}" style="transform: scale(1.5)" alt="${playerOption}">
            `;
            // Se busca el ganador, se agrega un punto al ganador y se imprime el resultado
            setTimeout(() => {
                switch (whoWinsPoint(playerOption, machineOption)) {
                    case 'player':
                        localState.player.score++;
                        break;
                    case 'machine':
                        localState.machine.score++;
                        break;
                }
                div.innerHTML = `
                    <img src="${playedImg[machineOption]}" style="transform: rotateZ(180deg) scale(1.5)" alt="${machineOption}">
                    <p>Player: ${localState.player.score} - Machine: ${localState.machine.score}</p>
                    <img src="${playedImg[playerOption]}" style="transform: scale(1.5)" alt="${playerOption}">
                `;

                setTimeout(() => {
                    if (localState.player.score === 3 || localState.machine.score === 3){
                        localState.player.playedOption = playerOption;
                        localState.machine.playedOption = machineOption;
                        localState.runGame = false;
                        const newState = localState;
                        localState = state.getState();
                        state.setState(newState);
                    } else {
                        render();
                    }
                }, 1000);
            },200);
        }, 3000);

        // Evalua si el jugador gana el punto
        function whoWinsPoint(playerOption: string, machineOption: string){
            // Si el jugador no juega, la máquina gana
            if (playerOption === ''){
                return 'machine';
            }
            // Si ambos juegan la misma opción, es un empate
            if(playerOption === machineOption){
                return 'tie';
            }
            // Si el jugador juega una opción que le gana a la opción de la máquina, el jugador gana
            if( playerOption === 'piedra' && machineOption === 'tijera' ||
                playerOption === 'tijera' && machineOption === 'papel' ||
                playerOption === 'papel' && machineOption === 'piedra'){
                return 'player'
            } else { // Si no, la máquina gana
                return 'machine';
            }
        }
    }
    state.subscribe(render);


    return render();
}


