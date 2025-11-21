import { ChangeUserPassword, UserInterface, UserInterfaceResponse } from "@/models/user.interface";
import { api } from "./api";

export class UserService {
    static async create(user: UserInterface): Promise<UserInterfaceResponse> {
        const result = await api.post<UserInterfaceResponse>("user", user);
        return result.data;
    }

    static async delete(): Promise<void> {
        try {
            await api.delete(`/user`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Erro ao deletar conta');
        }
    }

    static async updatePassword(data: ChangeUserPassword): Promise<void> {
        try {
            const result = await api.patch('/user/change/password', data);
            console.log(result);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.response?.data?.message || 'Erro ao alterar senha');
        }
    }
}
