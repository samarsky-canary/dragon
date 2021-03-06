import axios from 'axios';
import { DragonModel } from '../dragon/dragon.model/dragon.model';
import { CreateSchemaDTO } from '../DTO/CreateSchemaDTO';
import { AuthStateService } from './AuthStateService';

export type SchemaDTO = {
    uuid: string;
    name: string;
    idUser: string;
    data: JSON;
    last_changed: string;
    last_changed_by_id: string;
}

const BASE_API_PREFIX = "/api/schema";

export class SchemaService {
    private static _instance: SchemaService;
    private static _authService : AuthStateService;
    private static _schema: DragonModel | undefined;

    constructor(authService : AuthStateService){
        SchemaService._authService = authService.getInstance();
    }
    public setModel(model: DragonModel){
        SchemaService._schema = model;
    }

    public getModel() {
        return SchemaService._schema;
    }

    public getInstance(): SchemaService {
        if (!SchemaService._instance){
            SchemaService._instance = new SchemaService(SchemaService._authService);
        }
        return SchemaService._instance;
    }
    private setTokenBearer(){
        return {
            "Authorization" : `Bearer ${SchemaService._authService.getToken()}`
        }
    }

    public async getUserSchemas(user_id : string) : Promise<SchemaDTO[]> {
        return axios.get<Array<SchemaDTO>>(`${BASE_API_PREFIX}/user/${user_id}`, {
            headers : this.setTokenBearer(),
        })
        .then(response => {
            return response.data;
        })
        .catch(() => {
            throw new Error("unable to get schemas");
        })
    }


    public async createNewSchema(user_id: string) : Promise<SchemaDTO | undefined> {
        const schema: CreateSchemaDTO = {
            name: "NewSchema",
            idUser: user_id,
            last_changed_by_id: user_id,
            data: new DragonModel().toJSON()
        }
        return axios.post<SchemaDTO>(`${BASE_API_PREFIX}/create`, schema, {
            headers : this.setTokenBearer()
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return undefined;
        });
    }

    public updateSchema(schema: SchemaDTO): Promise<SchemaDTO | undefined> {
        schema.last_changed_by_id = SchemaService._authService.getUUID();
        return axios.put<SchemaDTO>(`${BASE_API_PREFIX}/${schema.uuid}`, schema, {
            headers : this.setTokenBearer()
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
            return undefined;
        });
    }

    public deleteSchema(id: string): Promise<any> {
        return axios.delete<SchemaDTO>(`${BASE_API_PREFIX}/${id}`, {
            headers : this.setTokenBearer()
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