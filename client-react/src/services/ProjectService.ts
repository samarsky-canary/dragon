import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/schema";



export class SchemaService {
    private static _instance: SchemaService;
    private static _authService : AuthStateService;

    constructor(authService : AuthStateService){
        SchemaService._authService = authService.getInstance();
    }

    public getInstance(): SchemaService {
        if (!SchemaService._instance){
            SchemaService._instance = new SchemaService(SchemaService._authService);
        }
        return SchemaService._instance;
    }

    public async getUserSchemas(user_id : string) : Promise<SchemaDTO[]> {
        const headers = {
            "Authorization" : `Bearer ${SchemaService._authService.getToken()}`
        }
        return axios.get<Array<SchemaDTO>>(`${BASE_API_PREFIX}/user/${user_id}`, {
            headers : headers,
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw new Error("unable to get schemas");
        })
    }
}


export type SchemaDTO = {
    uuid: string;
    name: string;
    idUser: string;
    data: JSON;
    last_changed: string;
    last_changed_by_id: string;
}