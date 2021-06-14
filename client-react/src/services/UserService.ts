import axios from 'axios';
import { UserDTO } from '../DTO/UserDTO';
import { AuthStateService } from './AuthStateService';

const BASE_API_PREFIX = "/api/users";

export class UserService {
    private static _instance: UserService;
    private static _authService : AuthStateService;

    constructor(authService : AuthStateService){
        UserService._authService = authService.getInstance();
    }

    public getInstance(): UserService {
        if (!UserService._instance){
            UserService._instance = new UserService(UserService._authService);
        }
        return UserService._instance;
    }


    private setTokenBearer(){
        return {
            "Authorization" : `Bearer ${UserService._authService.getToken()}`
        }
    }
    public getUserinfoById(uuid: string) : Promise<UserDTO> {
        return axios.get(`${BASE_API_PREFIX}/${uuid}`,{
            headers: this.setTokenBearer()
        })
        .then(response => response.data)
        .catch(err => {throw new Error("Unable to get data")}
        )
    }

    public GetUnprevilegedUsers() : Promise<UserDTO[]> {
        const headers = {
            "Authorization" : `Bearer ${UserService._authService.getToken()}`
        }
        return axios.get(`${BASE_API_PREFIX}/nonpriveleged`, {
            headers: this.setTokenBearer()
        })
        .then(response => response.data);
    }
}