export interface GameList {
    gameId : number;
    gameName : string;
    playersMin : number;
    playersMax : number;
    averageDuration : number;
    ageMin : number;
    picture : string;
}


export interface GameListUser {
    gameId : number;
    gameName : string;
}


export interface PlayerGame {
    fkGame: {
        gameId : number;
        gameName : string;
    }
}
