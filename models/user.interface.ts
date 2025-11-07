import { CommonInterface } from "./common.interface";

export interface UserInterface {
    password: string;
    userName: string;
    fullName: string;
    telephone: string;
    email: string;
    perfilId?: string;
}

export interface UserInterfaceResponse 
extends Omit<UserInterface, "password">, CommonInterface { }