export interface EventFull {
    eventId : number;
    startTime : string;
    endTime : string ;
    registrationClosingDate : string;
    eventName : string;
    eventDescription : string;
    participatingPlayers : string[];
    fkOrganizerId : number;
}