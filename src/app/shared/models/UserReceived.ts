import { UserLight } from "./UserLight";

export interface UserReceived { // correspond à ce qui est reçu du backend
token : string;
member : UserLight; // id et nickname
}

