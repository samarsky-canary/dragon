import axios from 'axios';
import { UserDTO } from '../DTO/UserDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/users";

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

}