import { User } from "./User";

export interface UserReceived { // correspond à ce qui est reçu du backend
token : string;
member : User;
}

