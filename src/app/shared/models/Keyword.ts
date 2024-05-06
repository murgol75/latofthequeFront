export interface Keyword { // modele qui sera surement à revoir
    fkKeywordId: number;
    keywordNote: number;
    fkKeyword: {
        keywordId: number;
        keywordName: string;
        keywordDescription: string | null;
        playerKeywords: any[]; // ou le type approprié si possible
        fkGames: any[]; // ou le type approprié si possible
};
}