export interface Game {
    gameId : number;
    gameName : string;
    playersMin : number;
    playersMax : number;
    averageDuration : number;
    ageMin : number;
    picture : string;
    gameDescription : string;
    video : string;
    isExtension : boolean;
    fkThemeId : number;
    fkTheme : string;
    fkKeywords: string[];
    fkSecondaryThemes:string;

    // ICollection<PlayerGame> PlayerGames { get; set; } = new List<PlayerGame>();
    // ICollection<Keyword> FkKeywords { get; set; } = new List<Keyword>();
    // ICollection<Theme> FkSecondaryThemes { get; set; } = new List<Theme>();
}
