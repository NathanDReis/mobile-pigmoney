import { CommonInterface } from "./common.interface";

export interface PerfilInterface {
    name: string;
    permissions: string[];
}

export interface PerfilInterfaceResponse 
extends PerfilInterface, CommonInterface  { }