import { UserInterface, UserInterfaceResponse } from "@/models/user.interface";
import * as SecureStore from 'expo-secure-store';
import { api } from "./api";

export class UserService {
    static async create(user: UserInterface): Promise<UserInterfaceResponse> {
        const result = await api.post<UserInterfaceResponse>("user", user);
        return result.data;
    }

    static async findOneLocal(): Promise<any> {
        return SecureStore.getItemAsync('user');
    }
}
