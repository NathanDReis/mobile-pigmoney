import { PerfilInterfaceResponse } from "@/models/perfil.interface";
import { api } from "./api";

export class PerfilService {
    static async findOne(id: string): Promise<PerfilInterfaceResponse> {
        const result = await api.get<PerfilInterfaceResponse>(`perfil/${id}`);
        return result.data;
    }
}
