import { GameLight } from "./GameLight";
import { KeywordLight } from "./KeywordLight";
import { ThemeLight } from "./ThemeLight";
import { EventLight } from "./eventLight";

export interface UserFull {
    playerId : number;
    nickname : string;
    email : string;
    birthdate : Date;
    events : EventLight[];
    keyword : KeywordLight[];
    theme : ThemeLight[];
    game : GameLight[];
    playerKeywords: { 
        keywordNote: number;
        fkKeyword: {
            keywordName: string;
        }
    }[];
    playerThemes: {
        themeNote: number;
        fkTheme: {
            themeName: string;
        }
    }[];
    playerGames: { 
        fkGame: {
            gameId : number;
            gameName : string;
        }
    }[];
}