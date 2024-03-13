function supportStorage(){
    return typeof(Storage) !== "undefined";
}

type StateData = {
    plays: string[],
    player: {playedOption: string, score: number},
    machine: {playedOption: string, score: number},
    runGame: boolean,
    playedImg: {piedra:string, papel:string, tijera:string}
}

const state= {

    data: {
        plays: ['tijera', 'piedra', 'papel'],
        player: {playedOption: '', score: 0},
        machine: {playedOption: '', score: 0},
        playedImg: {
            piedra: '/img/piedra.svg',
            papel: '/img/papel.svg',
            tijera: '/img/tijera.svg'
        },
        runGame: true,
    },
    listeners: [], // Callbacks

    getState(): StateData {
        // Si el navegador soporta localStorage, obtiene los datos guardados
        if(supportStorage()){

            let gameData = localStorage.getItem('PPTGameData');
            // Si existe el dato en el storage, lo guarda en el estado y lo retorna.
            if(gameData){
                return this.data = JSON.parse(gameData);
            } else {
                localStorage.setItem('PPTGameData', JSON.stringify(this.data));
                return this.data;
            }
        }
        // Si el navegador no soporta localStorage, retorna el estado.
        return this.data
    },
    setState(stateData : StateData): void {
        if(supportStorage()){
            localStorage.setItem('PPTGameData', JSON.stringify(stateData));
        } else {
            this.data = stateData;
        }
        this.listeners.forEach( (callback: (arg: unknown) => unknown):void => {
            callback(this.data);
        });
    },
    resetState(): void {
        localStorage.removeItem('PPTGameData');
        this.data = {
            plays: ['tijera', 'piedra', 'papel'],
            player: {playedOption: '', score: 0},
            machine: {playedOption: '', score: 0},
            playedImg: {
                piedra: '/img/piedra.svg',
                papel: '/img/papel.svg',
                tijera: '/img/tijera.svg'
            },
            runGame: true,
        };
        this.setState(this.data);

    },
    subscribe(callback: (arg: unknown) => unknown): void {
        // Take the callback and add it to the listeners array
        // @ts-ignore
        this.listeners.push(callback);
    },
}

export {
    state
};