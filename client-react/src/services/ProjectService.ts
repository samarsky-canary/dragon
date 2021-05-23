import axios from 'axios';
import { loginResponseDTO } from '../DTO/IloginResponseDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/schema";



export class ProjectService {
    private static _instance: ProjectService;
    private static _authService : AuthStateService;

    constructor(authService : AuthStateService){
        ProjectService._authService = authService.getInstance();
    }

    public getInstance(): ProjectService {
        if (!ProjectService._instance){
            ProjectService._instance = new ProjectService(ProjectService._authService);
        }
        return ProjectService._instance;
    }

    public async getUserSchemas(user_id : string) {
        const headers = {
            "Authorization" : `Bearer ${ProjectService._authService.getToken()}`
        }
        return axios.post<Array<SchemaDTO>>(`${BASE_API_PREFIX}/user/`, {
            headers : headers,
            params: {
                id: user_id
            }
        })
        .then(response => {
            //TODO: дописать после создания тестов
            return response.data;
        })
    }
}


interface SchemaDTO {
    uuid: string;
    name: string;
    idUser: string;
    data: JSON;
    last_changed: string;
    last_changed_by_id: string;
}