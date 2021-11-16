import {UserInterface} from "./auth/user-interface";

export interface ResultForm{
  token:string;
  expirationTtl?:number;
  user:UserInterface;
}
