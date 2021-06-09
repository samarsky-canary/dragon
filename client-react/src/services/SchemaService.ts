import axios from 'axios';
import { DragonModel } from '../dragon/dragon.model/dragon.model';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/schema";

export class SchemaService {
    private static _instance: SchemaService;
    private static _authService : AuthStateService;
    private static _schema: DragonModel | undefined;




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


    public async createNewSchema(user_id: string) : Promise<SchemaDTO | undefined> {
        const headers = {
            "Authorization" : `Bearer ${SchemaService._authService.getToken()}`
        }
        const schema: CreateSchemaDTO = {
            name: "NewSchema",
            idUser: user_id,
            last_changed_by_id: user_id,
            data: new DragonModel().toJSON()
        }
        return axios.post<SchemaDTO>(`${BASE_API_PREFIX}/create`, schema, {
            headers : headers
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return undefined;
        });
    }
}


export type CreateSchemaDTO = {
    name: string;
    idUser: string;
    data: JSON;
    last_changed_by_id: string;
}


export type SchemaDTO = {
    uuid: string;
    name: string;
    idUser: string;
    data: JSON;
    last_changed: string;
    last_changed_by_id: string;
}