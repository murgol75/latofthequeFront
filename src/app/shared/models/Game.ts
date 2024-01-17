export interface Game {
    gameId : number;
    gameName : string;
    PlayersMin : number;
    PlayersMax : number;
    AverageDuration : number;
    AgeMin : number;
    Picture : string;
    GameDescription : string;
    Video : string;
    IsExtension : boolean;
    FkTheme : number;
    // ICollection<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();
    // ICollection<Keyword> FkKeywords { get; set; } = new List<Keyword>();
    // ICollection<Theme> FkSecondaryThemes { get; set; } = new List<Theme>();
}
