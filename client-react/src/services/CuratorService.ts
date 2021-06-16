import axios from 'axios';
import { CreateRelationDTO } from '../DTO/CreateRelationDTO';
import { RelationDTO } from '../DTO/relationDTO';
import { UserDTO } from '../DTO/UserDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/curators";

export class CuratorService {
    private static _instance: CuratorService;
    private static _authService : AuthStateService;

    constructor(authService : AuthStateService){
        CuratorService._authService = authService.getInstance();
    }

    public getInstance(): CuratorService {
        if (!CuratorService._instance){
            CuratorService._instance = new CuratorService(CuratorService._authService);
        }
        return CuratorService._instance;
    }

    public createRelation(relation : CreateRelationDTO) {
        return axios.post<RelationDTO>(BASE_API_PREFIX+'/create',relation).then(response => 
            response.data);
    }

    public DeleteRelation(id: number) {
        return axios.delete(BASE_API_PREFIX+'/' + id).then(response => 
            response.data);
    }

    public getRelationsByCurator(curator: string) {
        return axios.get<RelationDTO[]>(BASE_API_PREFIX+'/relations/'+curator).then(response => 
            response.data);
    }

    public updateRelation(relation: RelationDTO) {
        return axios.put<RelationDTO>(BASE_API_PREFIX, relation).then(response => 
            response.data);
    }

}