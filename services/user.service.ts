import { UserInterface, UserInterfaceResponse } from "@/models/user.interface";
import { api } from "./api";

export class UserService {
    static async create(user: UserInterface): Promise<UserInterfaceResponse> {
        const result = await api.post<UserInterfaceResponse>("user", user);
        return result.data;
    }
}
