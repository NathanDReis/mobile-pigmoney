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
export interface ChangeUserPassword {
    newPassword: string;
    currentPassword: string;
}

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  telephone?: string;
  userName?: string;
  perfilId?: string;
}